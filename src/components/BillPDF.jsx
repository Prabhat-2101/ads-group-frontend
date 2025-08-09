import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10, marginTop: 10 },
  title: { fontSize: 20, textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  address: { textAlign: 'center', marginBottom: 20 },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid black',
    paddingBottom: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    backgroundColor: '#333',
    color: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 2,
    padding: 2,
  },
  col: { width: '16.6%', paddingRight: 5 },
  footer: { marginTop: 30, fontSize: 10, textAlign: 'center' },
  blueRow: { backgroundColor: '#e0f7ff' },
  grayRow: { backgroundColor: '#f0f0f0' },
});

const BillPDF = ({ buyer, items }) => {
  const totalSum = items.reduce((sum, item) => sum + item.sell_price * item.quantity, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>ADS Group</Text>
        <Text style={styles.address}>
          Address: Chatauni Road, NH-28A Near J. J. Kanak Hospital, Motihari, 845401
        </Text>

        <View style={styles.section}>
          <Text>Buyer Name: {buyer.buyer_name}</Text>
          <Text>Mobile: {buyer.mobile_number}</Text>
          <Text>Address: {buyer.address}</Text>
          <Text>Bill ID: {buyer.bill_id}</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.col}>S.No.</Text>
          <Text style={styles.col}>Item No</Text>
          <Text style={styles.col}>Item Name</Text>
          <Text style={styles.col}>Price</Text>
          <Text style={styles.col}>Qty</Text>
          <Text style={styles.col}>Total</Text>
        </View>

        {items.map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.tableRow,
              idx % 2 === 0 ? styles.blueRow : styles.grayRow,
            ]}
          >
            <Text style={styles.col}>{idx + 1}</Text>
            <Text style={styles.col}>{item.item_no}</Text>
            <Text style={styles.col}>{item.item_name}</Text>
            <Text style={styles.col}>{item.sell_price}</Text>
            <Text style={styles.col}>{item.quantity}</Text>
            <Text style={styles.col}>{item.sell_price * item.quantity}</Text>
          </View>
        ))}

        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Total Bill: Rs {totalSum}</Text>

        <Text style={styles.footer}>
          Thank you. Visit us again.
          {"\n"}Contact us: ads.company.group@gmail.com | Phone: 7079704030
        </Text>
      </Page>
    </Document>
  );
};

export default BillPDF;