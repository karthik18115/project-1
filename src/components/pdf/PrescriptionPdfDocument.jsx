import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register a font (optional, but good for consistent rendering)
// You might need to host the font file or ensure it's accessible
// Font.register({
//   family: 'Open Sans',
//   fonts: [
//     { src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf' },
//     { src: 'https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN_r8-VF9s.ttf', fontWeight: 'bold' },
//   ]
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica', // Default font
    // fontFamily: 'Open Sans', // Use registered font
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
    lineHeight: 1.5,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
    // fontWeight: 'bold', // if using registered font with weights
  },
  title: {
    fontSize: 16,
    marginBottom: 15,
    color: '#1a56db', // A blue color, similar to theme
    // fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
    padding: 10,
    border: '1px solid #EEEEEE',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 13,
    marginBottom: 8,
    color: '#374151', // Slate-700
    // fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    color: '#4B5563', // Slate-600
  },
  text: {
    marginBottom: 3,
    color: '#1F2937', // Slate-800
  },
  footer: {
    position: 'absolute',
    fontSize: 9,
    bottom: 15,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: 'grey',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  gridLabel: {
    width: '30%',
    fontWeight: 'bold',
    color: '#4B5563',
  },
  gridValue: {
    width: '70%',
    color: '#1F2937',
  },
  notesSection: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#F3F4F6', // slate-100
    borderRadius: 3,
  },
  notesText: {
    fontSize: 10,
    color: '#374151', // slate-700
  }
});

// Create Document Component
const PrescriptionPdfDocument = ({ prescription }) => {
  if (!prescription) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>No prescription data provided.</Text>
        </Page>
      </Document>
    );
  }

  const {
    medication,
    dosage,
    startDate,
    endDate,
    doctor,
    notes,
    refillsLeft,
    status
  } = prescription;

  return (
    <Document title={`Prescription - ${medication}`} author="MedRec App">
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Prescription Details</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medication Information</Text>
          <View style={styles.gridContainer}>
            <Text style={styles.gridLabel}>Medication:</Text>
            <Text style={styles.gridValue}>{medication}</Text>
          </View>
          <View style={styles.gridContainer}>
            <Text style={styles.gridLabel}>Dosage:</Text>
            <Text style={styles.gridValue}>{dosage}</Text>
          </View>
          <View style={styles.gridContainer}>
            <Text style={styles.gridLabel}>Status:</Text>
            <Text style={styles.gridValue}>{status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prescription Period & Provider</Text>
          <View style={styles.gridContainer}>
            <Text style={styles.gridLabel}>Start Date:</Text>
            <Text style={styles.gridValue}>{new Date(startDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.gridContainer}>
            <Text style={styles.gridLabel}>End Date:</Text>
            <Text style={styles.gridValue}>{endDate ? new Date(endDate).toLocaleDateString() : 'Ongoing'}</Text>
          </View>
          <View style={styles.gridContainer}>
            <Text style={styles.gridLabel}>Prescribed by:</Text>
            <Text style={styles.gridValue}>{doctor}</Text>
          </View>
           {status === 'Active' && (
            <View style={styles.gridContainer}>
              <Text style={styles.gridLabel}>Refills Left:</Text>
              <Text style={styles.gridValue}>{refillsLeft}</Text>
            </View>
          )}
        </View>

        {notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Doctor's Notes</Text>
            <View style={styles.notesSection}>
              <Text style={styles.notesText}>{notes}</Text>
            </View>
          </View>
        )}

        <Text style={styles.footer}>
          Generated by MedRec Application on {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
};

export default PrescriptionPdfDocument; 