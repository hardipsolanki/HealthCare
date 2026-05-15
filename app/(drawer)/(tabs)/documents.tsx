import React, { useCallback, useMemo, useRef, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import DocumentCard from "@/components/documents/documentCard";

import Header from "@/components/documents/myDocumentsHeader";

import FilterBottomSheet from "@/components/FilterBottomSheet";

import { useFilterDocuments } from "@/hooks/queries/getDocuments";

import { ROUTES_PATH } from "@/constant";

import { useAppSelector } from "@/store/hooks";

import { COLORS } from "@/theme/colors";

import { DocumentType, FetchDocumentsPayload, FileType } from "@/types";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";

// import EmptySvg from "@/assets/svg/empty.svg";

const Documents = () => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  const user = useAppSelector((state) => state.auth.user);

  const [filters, setFilters] = useState<FetchDocumentsPayload>({
    filter: {
      search: "",

      createdBy: user?.id || "",

      doctorName: "",

      documentType: undefined,

      fileName: "",

      fileType: undefined,

      hospitalName: "",

      title: "",

      type: undefined,
    },

    sort: {
      sortBy: "title",

      orderBy: "asc",
    },

    page: {
      pageNumber: 0,

      pageLimit: 10,
    },
  });

  /**
   * Documents API
   */
  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFilterDocuments(filters);

  /**
   * Unique Documents
   */
  const documentList = useMemo(() => {
    const allDocs =
      data?.pages.flatMap((page: any) => page?.data?.data || []) || [];

    /**
     * Remove duplicate ids
     */
    return allDocs.filter(
      (doc, index, self) => index === self.findIndex((d) => d.id === doc.id),
    );
  }, [data]);

  /**
   * Apply Filters
   */
  const handleApplyFilters = useCallback(
    (newFilters: FetchDocumentsPayload) => {
      const updatedFilters: FetchDocumentsPayload = {
        filter: {
          /**
           * Required
           */
          createdBy: user?.id || "",

          /**
           * Optional
           */
          search: newFilters?.filter?.search || "",

          doctorName: newFilters?.filter?.doctorName || "",

          documentType: newFilters?.filter?.documentType as
            | DocumentType
            | undefined,

          fileName: newFilters?.filter?.fileName || "",

          fileType: newFilters?.filter?.fileType as FileType | undefined,

          hospitalName: newFilters?.filter?.hospitalName || "",

          title: newFilters?.filter?.title || "",

          type: newFilters?.filter?.type as DocumentType | undefined,
        },

        sort: {
          sortBy: newFilters?.sort?.sortBy || "createdAt",

          orderBy: newFilters?.sort?.orderBy || "asc",
        },

        /**
         * Reset pagination on new filters
         */
        page: {
          pageNumber: 0,

          pageLimit: 10,
        },
      };

      /**
       * Prevent unnecessary rerender
       */
      setFilters((prev) => {
        const prevString = JSON.stringify(prev);

        const newString = JSON.stringify(updatedFilters);

        if (prevString === newString) {
          return prev;
        }

        return updatedFilters;
      });

      /**
       * Close BottomSheet
       */
      // closeBottomSheet();
    },
    [user?.id],
  );

  /**
   * Pull To Refresh
   */
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  /**
   * Initial Loader
   */
  const showInitialLoader =
    (isLoading || isRefetching) && documentList.length === 0;

  return (
    <>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      >
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <StatusBar barStyle="light-content" />
          {/* Header */}
          <Header onOpenFilter={openBottomSheet} />

          {/* Content */}
          <View style={styles.container}>
            {showInitialLoader ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : documentList.length === 0 ? (
              <View style={styles.emptyContainer}>
                {/* <EmptySvg width={220} height={220} /> */}

                <Text style={styles.emptyTitle}>No Documents Found</Text>

                <Text style={styles.emptySubtitle}>
                  Try changing filters or search keyword
                </Text>
              </View>
            ) : (
              <FlatList
                data={documentList}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                onEndReachedThreshold={0.2}
                removeClippedSubviews
                maxToRenderPerBatch={10}
                windowSize={10}
                initialNumToRender={10}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={onRefresh}
                    colors={[COLORS.primary]}
                    tintColor={COLORS.primary}
                  />
                }
                onEndReached={() => {
                  if (hasNextPage && !isFetchingNextPage && !isRefetching) {
                    fetchNextPage();
                  }
                }}
                renderItem={({ item }) => (
                  <DocumentCard
                    item={item}
                    onPress={() =>
                      router.push({
                        pathname: ROUTES_PATH.DocumentDetails,

                        params: {
                          documentId: item.id,
                        },
                      })
                    }
                  />
                )}
                ListFooterComponent={
                  isFetchingNextPage ? (
                    <ActivityIndicator
                      size="small"
                      color={COLORS.primary}
                      style={styles.footerLoader}
                    />
                  ) : null
                }
              />
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={{ flex: 1 }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
            opacity={0.5}
          />
        )}
      >
        <FilterBottomSheet
          onApply={handleApplyFilters}
          onClose={closeBottomSheet}
        />
      </BottomSheetModal>
    </>
  );
};

export default Documents;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  linearGradient: {
    flex: 1,
  },

  container: {
    flex: 1,

    backgroundColor: "#F8F8FC",

    borderTopLeftRadius: 24,

    borderTopRightRadius: 24,

    overflow: "hidden",
  },

  listContent: {
    paddingTop: 16,

    paddingBottom: 24,
  },

  footerLoader: {
    marginVertical: 20,
  },

  loaderContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  emptyContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 20,

    fontWeight: "700",

    color: "#1A1A1A",

    marginTop: 16,
  },

  emptySubtitle: {
    fontSize: 14,

    color: "#777",

    marginTop: 8,

    textAlign: "center",
  },
});
