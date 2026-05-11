import DocumentCard from "@/components/documents/documentCard ";
import Header from "@/components/documents/myDocumentsHeader";
import { DocumentItemType } from "@/types";
import React from "react";
import { FlatList, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const documents = () => {
  const DOCUMENTS: DocumentItemType[] = [
    {
      id: "1",
      title: "Blood Test Report",
      date: "20 May 2024",
      type: "PDF",
      size: "2.4 MB",
    },
    {
      id: "2",
      title: "X-Ray Chest",
      date: "18 May 2024",
      type: "JPG",
      size: "1.8 MB",
    },
    {
      id: "24",
      title: "X-Ray Chest",
      date: "18 May 2024",
      type: "JPG",
      size: "1.8 MB",
    },
    {
      id: "23",
      title: "X-Ray Chest",
      date: "18 May 2024",
      type: "JPG",
      size: "1.8 MB",
    },
    {
      id: "3",
      title: "Prescription - Dr. Mehta",
      date: "10 May 2024",
      type: "PDF",
      size: "1.2 MB",
    },
    {
      id: "4",
      title: "MRI Scan Report",
      date: "05 May 2024",
      type: "PDF",
      size: "3.6 MB",
    },
    {
      id: "5",
      title: "Vaccination Certificate",
      date: "01 May 2024",
      type: "PDF",
      size: "1.1 MB",
    },
    {
      id: "6",
      title: "Health Insurance",
      date: "28 Apr 2024",
      type: "PDF",
      size: "1.5 MB",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent={false} barStyle="dark-content" />

      <FlatList
        data={DOCUMENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DocumentCard item={item} />}
        ListHeaderComponent={<Header />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponentStyle={{ marginBottom: 16 }}
      />
    </SafeAreaView>
  );
};

export default documents;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8FC",
  },

  listContent: {
    paddingBottom: 24,
  },
});
