/**
 * PolicyCover Quote Forms — Google Sheet Header Setup
 * Run this once via Extensions > Apps Script to add column headers to all tabs.
 */
function setupHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const tabs = {
    'Auto': [
      'submitted_at','first_name','last_name','street_address','city','province','postal_code','phone','email',
      'num_vehicles',
      'vehicle_1_ymm','vehicle_1_purchase_date','vehicle_1_annual_km','vehicle_1_oneway_km','vehicle_1_ownership','vehicle_1_winter_tires',
      'vehicle_2_ymm','vehicle_2_purchase_date','vehicle_2_annual_km','vehicle_2_oneway_km','vehicle_2_ownership','vehicle_2_winter_tires',
      'vehicle_3_ymm','vehicle_3_purchase_date','vehicle_3_annual_km','vehicle_3_oneway_km','vehicle_3_ownership','vehicle_3_winter_tires',
      'num_drivers',
      'driver_1_license','driver_1_g1_month','driver_1_g1_year','driver_1_g2_month','driver_1_g2_year','driver_1_g_month','driver_1_g_year',
      'driver_2_license','driver_2_g1_month','driver_2_g1_year','driver_2_g2_month','driver_2_g2_year','driver_2_g_month','driver_2_g_year',
      'driver_3_license','driver_3_g1_month','driver_3_g1_year','driver_3_g2_month','driver_3_g2_year','driver_3_g_month','driver_3_g_year',
      'driver_4_license','driver_4_g1_month','driver_4_g1_year','driver_4_g2_month','driver_4_g2_year','driver_4_g_month','driver_4_g_year'
    ],

    'Home': [
      'submitted_at','email','phone','street_address','city','province','postal_code','move_in_date',
      'num_owners',
      'owner_1_first_name','owner_1_last_name','owner_1_dob',
      'owner_2_first_name','owner_2_last_name','owner_2_dob',
      'owner_3_first_name','owner_3_last_name','owner_3_dob',
      'house_type','sqft','year_built','num_bedrooms','num_washrooms','roof_update_year',
      'basement_finished','basement_rented','basement_type'
    ],

    'Commercial': [
      'submitted_at','incorporation_name','business_name','owner_name','owner_dob','email','phone','home_address',
      'business_address','sqft','year_built','num_storeys','upgrades',
      'yearly_revenue','contents_value','equipment_value','current_insurer_expiry'
    ],

    'SuperVisa': [
      'submitted_at','visa_type','coverage_start','coverage_end','sponsor_name','relationship',
      'num_travelers',
      'traveler_1_first_name','traveler_1_last_name','traveler_1_dob','traveler_1_gender','traveler_1_preexisting','traveler_1_medications',
      'traveler_2_first_name','traveler_2_last_name','traveler_2_dob','traveler_2_gender','traveler_2_preexisting','traveler_2_medications',
      'email','phone','street_address','city','province','postal_code'
    ],

    'Contact': [
      'submitted_at','name','email','phone','service','message'
    ]
  };

  let results = [];

  for (const [tabName, headers] of Object.entries(tabs)) {
    let sheet = ss.getSheetByName(tabName);

    // Create the tab if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      results.push(`Created tab: ${tabName}`);
    } else {
      results.push(`Found tab: ${tabName}`);
    }

    // Write headers to row 1
    const range = sheet.getRange(1, 1, 1, headers.length);
    range.setValues([headers]);
    range.setBackground('#1a1a2e');
    range.setFontColor('#ffffff');
    range.setFontWeight('bold');

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, headers.length);

    // Freeze header row
    sheet.setFrozenRows(1);

    results.push(`  → ${headers.length} columns written`);
  }

  Logger.log(results.join('\n'));
  SpreadsheetApp.getUi().alert('Done!\n\n' + results.join('\n'));
}
