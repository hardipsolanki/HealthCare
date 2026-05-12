import DocumentCard from "@/components/documents/documentCard ";
import Header from "@/components/documents/myDocumentsHeader";
import FilterBottomSheet from "@/components/FilterBottomSheet";
import { ROUTES_PATH } from "@/constant";
import { useFilterDocuments } from "@/hooks/queries/getDocuments";
import { COLORS } from "@/theme/colors";
import { FetchDocumentsPayload } from "@/types";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const documents = () => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["52%"], []);

  const [filters, setFilters] = useState<FetchDocumentsPayload>({
    filter: { search: "" },

    sort: {
      sortBy: "createdAt",
      orderBy: "desc",
    },
    page: {
      pageNumber: 0,
    },
  });

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFilterDocuments(filters);

  console.log({ data }, { hasNextPage }, { isFetchingNextPage }, { refetch });

  const documents = useMemo(
    () => data?.pages.flatMap((page) => page.data.data) || [],
    [data],
  );
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleApplyFilters = useCallback((filters: any) => {
    setFilters(filters);
    closeBottomSheet();
  }, []);

  if (!documents.length && isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      >
        <StatusBar translucent={false} barStyle="light-content" />

        <Header onOpenFilter={openBottomSheet} />

        <View style={styles.container}>
          <FlatList
            data={documents}
            keyExtractor={(item) => item.id}
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            onEndReachedThreshold={0.2}
            onEndReached={() =>
              hasNextPage && !isFetchingNextPage && fetchNextPage()
            }
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator
                  color="blue"
                  size="small"
                  style={{ marginBottom: 5 }}
                />
              ) : null
            }
            ListFooterComponentStyle={styles.listFooter}
          />
        </View>
      </LinearGradient>

      {/* Bottom Sheet OUTSIDE Header */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.4}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <FilterBottomSheet
            onApply={handleApplyFilters}
            onClose={closeBottomSheet}
          />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default documents;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8FC",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  linearGradient: {
    flex: 1,
  },
  listFooter: {
    marginBottom: 24,
  },
  conatiner: {
    backgroundColor: "#F8F8FC",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
  },

  listContent: {
    paddingBottom: 24,
    marginTop: 16,
  },
});
