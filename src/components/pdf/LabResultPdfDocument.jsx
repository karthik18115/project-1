import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Font registration can be done here if custom fonts are needed and available
// Font.register({...});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 35,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 65,
    lineHeight: 1.4,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  labInfo: {
    textAlign: 'left',
  },
  reportTitleSection: {
    textAlign: 'right',
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 10,
    color: '#555555',
  },
  patientInfoSection: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  patientInfoColumn: {
    width: '48%',
  },
  patientName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 3,
  },
  patientDetailRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  patientDetailLabel: {
    fontSize: 10,
    color: '#555555',
    fontWeight: 'bold',
    width: '100px',
  },
  patientDetailValue: {
    fontSize: 10,
    color: '#555555',
  },
  reportMetaSection: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaInfoColumn: {
    width: '48%',
  },
  metaDetailRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  metaDetailLabel: {
    fontSize: 10,
    color: '#555555',
    fontWeight: 'bold',
    width: '120px', 
  },
  metaDetailValue: {
    fontSize: 10,
    color: '#555555',
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 8,
    color: '#16a085',
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  testResultTable: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#BFBFBF',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#BFBFBF',
    alignItems: 'center', // Vertically align items in row
  },
  tableColHeader: {
    borderStyle: 'solid',
    borderColor: '#BFBFBF',
    borderBottomColor: '#000000', 
    borderRightWidth: 1,
    backgroundColor: '#F0F0F0', 
    padding: 6, // Increased padding
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 9, // Slightly smaller header font
  },
  tableCol: {
    borderStyle: 'solid',
    borderColor: '#BFBFBF',
    borderRightWidth: 1,
    padding: 5,
    textAlign: 'left',
    fontSize: 9, // Slightly smaller cell font
  },
  flagNormal: { color: '#22c55e' }, // green-500
  flagAbnormal: { color: '#ef4444', fontWeight: 'bold' }, // red-500
  notesSection: {
    marginTop: 15,
    padding: 10,
    border: '1px solid #EEEEEE',
    borderRadius: 3,
    backgroundColor: '#F9F9F9',
  },
  notesTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  footer: {
    position: 'absolute',
    fontSize: 8,
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: 'grey',
  },
  disclaimer: {
    fontSize: 7,
    color: '#777777',
    marginTop: 20,
    textAlign: 'justify',
  },
});

const LabResultPdfDocument = ({ patientData, labReport }) => {
  if (!patientData || !labReport || !labReport.tests) {
    return (
      <Document>
        <Page style={styles.page}><Text>Lab result data is incomplete or missing.</Text></Page>
      </Document>
    );
  }

  // Date formatting helper
  const formatDateForDisplay = (dateString) => dateString ? new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

  return (
    <Document title={`Lab Report - ${labReport.reportId}`} author={labReport.performingLab || "MedRec App"}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerSection}>
          <View style={styles.labInfo}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#1a2b48'}}>{labReport.performingLab || 'MedRec Central Diagnostics'}</Text>
            <Text style={{fontSize: 9}}>123 Health Drive, Wellness City, ST 12345</Text>
            <Text style={{fontSize: 9}}>Phone: (555) 123-4567 | Fax: (555) 123-4568</Text>
          </View>
          <View style={styles.reportTitleSection}>
            <Text style={styles.mainTitle}>Laboratory Report</Text>
            <Text style={styles.subTitle}>Status: {labReport.status || 'Final'}</Text>
          </View>
        </View>
        <View style={styles.patientInfoSection}>
          <View style={styles.patientInfoColumn}>
            <Text style={styles.patientName}>{patientData.name || 'N/A'}</Text>
            <View style={styles.patientDetailRow}><Text style={styles.patientDetailLabel}>Patient ID:</Text><Text style={styles.patientDetailValue}>{patientData.patientId || 'N/A'}</Text></View>
            <View style={styles.patientDetailRow}><Text style={styles.patientDetailLabel}>Date of Birth:</Text><Text style={styles.patientDetailValue}>{formatDateForDisplay(patientData.dateOfBirth)}</Text></View>
          </View>
          <View style={styles.patientInfoColumn}>
            <View style={styles.patientDetailRow}><Text style={styles.patientDetailLabel}>Gender:</Text><Text style={styles.patientDetailValue}>{patientData.gender || 'N/A (Not in mock)'}</Text></View>
            <View style={styles.patientDetailRow}><Text style={styles.patientDetailLabel}>Accession #:</Text><Text style={styles.patientDetailValue}>{labReport.reportId || 'N/A'}</Text></View>
          </View>
        </View>
        <View style={styles.reportMetaSection}>
          <View style={styles.metaInfoColumn}>
            <View style={styles.metaDetailRow}><Text style={styles.metaDetailLabel}>Collection Date:</Text><Text style={styles.metaDetailValue}>{formatDateForDisplay(labReport.collectionDate)}</Text></View>
            <View style={styles.metaDetailRow}><Text style={styles.metaDetailLabel}>Report Date:</Text><Text style={styles.metaDetailValue}>{formatDateForDisplay(labReport.reportDate)}</Text></View>
          </View>
          <View style={styles.metaInfoColumn}>
            <View style={styles.metaDetailRow}><Text style={styles.metaDetailLabel}>Ordering Physician:</Text><Text style={styles.metaDetailValue}>{labReport.orderingPhysician || 'N/A'}</Text></View>
            <View style={styles.metaDetailRow}><Text style={styles.metaDetailLabel}>Specimen Type:</Text><Text style={styles.metaDetailValue}>{labReport.specimenType || 'Blood'}</Text></View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{labReport.reportName || 'Test Results'}</Text>
        
        <View style={styles.testResultTable}>
          <View style={styles.tableRow} fixed>
            <Text style={[styles.tableColHeader, {width: '30%'}]}>Test Name</Text>
            <Text style={[styles.tableColHeader, {width: '15%', textAlign: 'center'}]}>Result</Text>
            <Text style={[styles.tableColHeader, {width: '10%', textAlign: 'center'}]}>Flag</Text>
            <Text style={[styles.tableColHeader, {width: '15%'}]}>Units</Text>
            <Text style={[styles.tableColHeader, {width: '30%'}]}>Reference Range</Text>
          </View>
          {labReport.tests.map((test, index) => (
            <View style={styles.tableRow} key={test.testId || index} wrap={false}>
              <Text style={[styles.tableCol, {width: '30%'}]}>{test.name || 'N/A'}</Text>
              <Text style={[styles.tableCol, {width: '15%', textAlign: 'center'}, test.flag && test.flag !== 'Normal' ? styles.flagAbnormal : {}]}>{test.value || 'N/A'}</Text>
              <Text style={[styles.tableCol, {width: '10%', textAlign: 'center'}, test.flag && test.flag !== 'Normal' ? styles.flagAbnormal : styles.flagNormal]}>{test.flag || ''}</Text>
              <Text style={[styles.tableCol, {width: '15%'}]}>{test.units || 'N/A'}</Text>
              <Text style={[styles.tableCol, {width: '30%'}]}>{test.referenceRange || 'N/A'}</Text>
            </View>
          ))}
        </View>

        {labReport.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Notes / Comments:</Text>
            <Text style={{fontSize: 9}}>{labReport.notes}</Text>
          </View>
        )}
        
        <Text style={styles.disclaimer} fixed>
          This report is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </Text>

        <Text style={styles.footer} fixed>
          Generated by MedRec Application | {labReport.performingLab || 'MedRec Diagnostics'} | Page <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </Text>
      </Page>
    </Document>
  );
};

export default LabResultPdfDocument;