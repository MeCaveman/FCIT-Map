// Central room catalog: id, name, floor, category, optional description
// Add/edit your rooms here — Sidebar/SearchBar will reflect floors when available.
export type FloorId = "F1" | "F2";

export interface RoomRecord {
  id: string; // stable ID used by backend/db
  name: string; // display name (should match SVG clickable id for consistency)
  floor: FloorId; // "F1" | "F2"
  categoryId: string; // maps to categories
  desc?: string;
  vertexId?: string; // optional direct vertex mapping for navigation
}

const roomsCatalogRaw: RoomRecord[] = [

//Other
  //Entrances
    //F1
{ id: "e1", name: "Entrance 1", floor: "F1", categoryId: "Other", desc: "Main entrance", vertexId: "v1" },
{ id: "e2", name: "Entrance 2", floor: "F1", categoryId: "Other", desc: "Side entrance", vertexId: "v96" },
{ id: "e3", name: "Entrance 3", floor: "F1", categoryId: "Other", desc: "Back entrance", vertexId: "v14" },
    //F2
{ id: "f2_e1", name: "Entrance 1 - f2_e1", floor: "F2", categoryId: "Other", desc: "Main entrance - F2" },
{ id: "f2_e2", name: "Entrance 2 - f2_e2", floor: "F2", categoryId: "Other", desc: "Side entrance - F2" },
{ id: "f2_e3", name: "Entrance 3 - f2_e3", floor: "F2", categoryId: "Other", desc: "Back entrance - F2" },



//Toilets
{ id: "15E36", name: "Toilet - 15E36", floor: "F1", categoryId: "Bathroom", desc: "Main Hallway toilet", vertexId: "v54" },
{ id: "15I04-A", name: "Toilet - 15I04-A", floor: "F1", categoryId: "Bathroom", desc: "Main Hall Toilet", vertexId: "v101" },
{ id: "15I04-B", name: "Toilet - 15I04-B", floor: "F1", categoryId: "Bathroom", desc: "Main Hall Toilet" },
{ id: "15F07", name: "Toilet - 15F07", floor: "F1", categoryId: "Bathroom", desc: "L1-1 to L1-5 Toilet", vertexId: "v31" },
{ id: "15F22", name: "Toilet - 15F22", floor: "F1", categoryId: "Bathroom", desc: "L1-6 to L1-11 Toilet", vertexId: "v84" },
{ id: "15I05", name: "Toilet - 15I05", floor: "F1", categoryId: "Bathroom", desc: "Facilities Toilet 1", vertexId: "v125" },
{ id: "15I09", name: "Toilet - 15I09", floor: "F1", categoryId: "Bathroom", desc: "Facilities Toilet 2", vertexId: "v142" },
{ id: "15I24", name: "Toilet - 15I24", floor: "F1", categoryId: "Bathroom", desc: "H1-6 to H1-11 Toilet", vertexId: "v165" },
{ id: "15I03", name: "Toilet - 15I103", floor: "F1", categoryId: "Bathroom", desc: "Classes Hall Toilet", vertexId: "v208" },



//Facilities
//Elevators
{ id: "ele1", name: "Elevator 1", floor: "F1", categoryId: "Facilities", desc: "Elevator 1", vertexId: "v183" },
{ id: "ele2", name: "Elevator 2", floor: "F1", categoryId: "Facilities", desc: "Elevator 2", vertexId: "v185" },
{ id: "ele4", name: "Elevator 4", floor: "F1", categoryId: "Facilities", desc: "Elevator 4", vertexId: "v143" },
{ id: "ele5", name: "Elevator 5", floor: "F1", categoryId: "Facilities", desc: "Elevator 5", vertexId: "v104" },
{ id: "ele6", name: "Elevator 6", floor: "F1", categoryId: "Facilities", desc: "Elevator 6", vertexId: "v103" },
//Stairs
{ id: "15FS02", name: "Stair - 15FS02", floor: "F1", categoryId: "Facilities", desc: "L1-1 to L1-5 Stair", vertexId: "v35" },
{ id: "15FS03", name: "Stair - 15FS03", floor: "F1", categoryId: "Facilities", desc: "L1-6 to L1-11 Stair 2", vertexId: "v61" },
{ id: "15FS04", name: "Stair - 15FS04", floor: "F1", categoryId: "Facilities", desc: "L1-6 to L1-11 Stair 1", vertexId: "v82" },
{ id: "15IS23", name: "Stair - 15IS23", floor: "F1", categoryId: "Facilities", desc: "Classes Hall Stair", vertexId: "v182" },
//Lockers
{ id: "15F15", name: "Lockers - 15F15", floor: "F1", categoryId: "Facilities", desc: "Main Hallway Lockers 1", vertexId: "v47" },
{ id: "15F16", name: "Lockers - 15F16", floor: "F1", categoryId: "Facilities", desc: "Main Hallway Lockers 2", vertexId: "v46" },
{ id: "15F34", name: "Lockers - 15F34", floor: "F1", categoryId: "Facilities", desc: "Main Hall Lockers 1", vertexId: "v99" },
{ id: "15FI05", name: "Lockers - 15FI05", floor: "F1", categoryId: "Facilities", desc: "Main Hall Lockers 2", vertexId: "v98" },
//Lounges
{ id: "15I07-A", name: "Student Lounge - 15I07-A", floor: "F1", categoryId: "Facilities", desc: "Facilities corr Lounge", vertexId: "v129" },
{ id: "15I07-B", name: "Student Lounge - 15I07-B", floor: "F1", categoryId: "Facilities", desc: "Facilities corr Lounge", vertexId: "v131" },
{ id: "15F11", name: "Student Lounge - 15F11", floor: "F1", categoryId: "Facilities", desc: "L1-1 to L1-5 Lounge", vertexId: "v26" },
{ id: "15I37", name: "Student Lounge - 15I37", floor: "F1", categoryId: "Facilities", desc: "L1-14 to L1-17 Lounge" },
{ id: "15I08", name: "Faculty Lounge - 15I08", floor: "F1", categoryId: "Facilities", desc: "Facilities corr Lounge", vertexId: "v144" },
//rooms
{ id: "15I06", name: "Workshop - 15I06", floor: "F1", categoryId: "Facilities", desc: "Workshop", vertexId: "v123" },
{ id: "15F33", name: "Seminar - 15F33", floor: "F1", categoryId: "Facilities", desc: "Seminar room", vertexId: "v57" },
{ id: "15H42B", name: "Academic Guide - 15H42B", floor: "F1", categoryId: "Facilities", desc: "Academic Guide room", vertexId: "v112" },
{ id: "15I40", name: "Student clubs and Committiees - 15I40", floor: "F1", categoryId: "Facilities", desc: "Student clubs and Committiees room", vertexId: "v119" },



//Classrooms
{ id: "15I15", name: "H1-1 - 15I15", floor: "F1", categoryId: "Class", desc: "H1-1 Classroom", vertexId: "v151" },
{ id: "15I16", name: "H1-2 - 15I16", floor: "F1", categoryId: "Class", desc: "H1-2 Classroom", vertexId: "v154" },
{ id: "15I17", name: "H1-3 - 15I17", floor: "F1", categoryId: "Class", desc: "H1-3 Classroom", vertexId: "v158" },
{ id: "15I22A", name: "H1-4- 15I22A", floor: "F1", categoryId: "Class", desc: "H1-4 Classroom", vertexId: "v156" },
{ id: "15I22B", name: "H1-4 - 15I22B", floor: "F1", categoryId: "Class", desc: "H1-4 Classroom", vertexId: "v160" },
{ id: "15I23A", name: "H1-5 - 15I23A", floor: "F1", categoryId: "Class", desc: "H1-5 Classroom", vertexId: "v149" },
{ id: "15I23B", name: "H1-5 - 15I23B", floor: "F1", categoryId: "Class", desc: "H1-5 Classroom", vertexId: "v153" },
{ id: "15I06A", name: "H1-6 - 15I06A", floor: "F1", categoryId: "Class", desc: "H1-6 Classroom", vertexId: "v202" },
{ id: "15I06B", name: "H1-6 - 15I06B", floor: "F1", categoryId: "Class", desc: "H1-6 Classroom", vertexId: "v205" },
{ id: "15I04", name: "H1-7 - 15I04", floor: "F1", categoryId: "Class", desc: "H1-7 Classroom", vertexId: "v200" },
{ id: "15I01", name: "H1-8 - 15I01", floor: "F1", categoryId: "Class", desc: "H1-8 Classroom", vertexId: "v194" },
{ id: "15I27", name: "H1-9 - 15I27", floor: "F1", categoryId: "Class", desc: "H1-9 Classroom", vertexId: "v193" },
{ id: "15I36", name: "H1-10 - 15I36", floor: "F1", categoryId: "Class", desc: "H1-10 Classroom", vertexId: "v189" },
{ id: "15I29", name: "H1-11 - 15I29", floor: "F1", categoryId: "Class", desc: "H1-11 Classroom", vertexId: "v186" },



//Labs
{ id: "15F04A", name: "L1-1 - 15F04A", floor: "F1", categoryId: "Labs", desc: "L1-1", vertexId: "v14" },
{ id: "15F04B", name: "L1-1 - 15F04B", floor: "F1", categoryId: "Labs", desc: "L1-1", vertexId: "v18" },
{ id: "15F05A", name: "L1-2 - 15F05A", floor: "F1", categoryId: "Labs", desc: "L1-2 Door 1", vertexId: "v19" },
{ id: "15F05B", name: "L1-2 - 15F05B", floor: "F1", categoryId: "Labs", desc: "L1-2 Door 2", vertexId: "v22" },
{ id: "15F12A", name: "L1-3 - 15F12A", floor: "F1", categoryId: "Labs", desc: "L1-3 Door 1", vertexId: "v19" },
{ id: "15F12B", name: "L1-3 - 15F12B", floor: "F1", categoryId: "Labs", desc: "L1-3 Door 2", vertexId: "v22" },
{ id: "15F13A", name: "L1-4 - 15F13A", floor: "F1", categoryId: "Labs", desc: "L1-4 Door 1", vertexId: "v11" },
{ id: "15F13B", name: "L1-4 - 15F13B", floor: "F1", categoryId: "Labs", desc: "L1-4 Door 2", vertexId: "v16" },
{ id: "15F14", name: "L1-5 - 15F14", floor: "F1", categoryId: "Labs", desc: "L1-5", vertexId: "v5" },
{ id: "15F17", name: "L1-6 - 15F17", floor: "F1", categoryId: "Labs", desc: "L1-6", vertexId: "v63" },
{ id: "15F18", name: "L1-7 - 15F18", floor: "F1", categoryId: "Labs", desc: "L1-7", vertexId: "v67" },
{ id: "15F19", name: "L1-8 - 15F19", floor: "F1", categoryId: "Labs", desc: "L1-8", vertexId: "v73" },
{ id: "15F20", name: "L1-9 - 15F20", floor: "F1", categoryId: "Labs", desc: "L1-9", vertexId: "v75" },
{ id: "15F29A", name: "L1-10 - 15F29A", floor: "F1", categoryId: "Labs", desc: "L1-10 Door 1", vertexId: "v71" },
{ id: "15F29B", name: "L1-10 - 15F29B", floor: "F1", categoryId: "Labs", desc: "L1-10 Door 2", vertexId: "v77" },
{ id: "15F30A", name: "L1-11 - 15F30A", floor: "F1", categoryId: "Labs", desc: "L1-11 Door 1", vertexId: "v65" },
{ id: "15F30B", name: "L1-11 - 15F30B", floor: "F1", categoryId: "Labs", desc: "L1-11 Door 2", vertexId: "v69" },
{ id: "15I24", name: "L1-12 - 15I24", floor: "F1", categoryId: "Labs", desc: "L1-12", vertexId: "v133" },
{ id: "15I25", name: "L1-13 - 15I25", floor: "F1", categoryId: "Labs", desc: "L1-13", vertexId: "v127" },
{ id: "15I25A", name: "L1-14 - 15I25A", floor: "F1", categoryId: "Labs", desc: "L1-14 Door 1" },
{ id: "15I25B", name: "L1-14 - 15I25B", floor: "F1", categoryId: "Labs", desc: "L1-14 Door 2" },
{ id: "15I26", name: "L1-15 - 15I26", floor: "F1", categoryId: "Labs", desc: "L1-15" },
{ id: "15I39", name: "L1-16 - 15I39", floor: "F1", categoryId: "Labs", desc: "L1-16" },
{ id: "15I38", name: "L1-17 - 15I38", floor: "F1", categoryId: "Labs", desc: "L1-17" },



//Offices
{ id: "204", name: "Dr. Nabil Al-Bashiri Office - 204", floor: "F2", categoryId: "Office", desc: "Dr. Nabil Al-Bashiri" },
{ id: "205", name: "Dr. Abdullah Abu Al-Hamayel Office - 205", floor: "F2", categoryId: "Office", desc: "Dr. Abdullah Jamil Abu Al-Hamayel" },
{ id: "211", name: "Dr. Nasser Al-Baqmi Office - 211", floor: "F2", categoryId: "Office", desc: "Dr. Nasser Bin Namas Al-Baqmi" },
{ id: "212", name: "Dr. Sayem Rashid Office - 212", floor: "F2", categoryId: "Office", desc: "Dr. Sayem Rashid" },
{ id: "213", name: "Dr. Mohammed  Munawwar Office - 213", floor: "F2", categoryId: "Office", desc: "Dr. Mohammed Mustafa Munawwar" },
{ id: "214", name: "Dr. Md AbdulHamid Office - 214", floor: "F2", categoryId: "Office", desc: "Dr. Md AbdulHamid" },
{ id: "216", name: "Dr. Raed Al-Akhtar Office - 216", floor: "F2", categoryId: "Office", desc: "Dr. Raed Al-Akhtar" },
{ id: "218", name: "Dr. Tariq Mohammed Ahmed Office - 218", floor: "F2", categoryId: "Office", desc: "Dr. Tariq Mohammed Ahmed" },
{ id: "219", name: "Dr. Iftikhar  Khan Office - 219", floor: "F2", categoryId: "Office", desc: "Dr. Iftikhar Ahmed Khan" },
{ id: "220", name: "Dr. Murshid Al-Darbali Office - 220", floor: "F2", categoryId: "Office", desc: "Dr. Murshid Al-Darbali" },
{ id: "229", name: "Dr. Ahmed Jamal Tayeb Office - 229", floor: "F2", categoryId: "Office", desc: "Dr. Ahmed Jamal Tayeb" },
{ id: "230", name: "Dr. Hossam Lahza Office - 230", floor: "F2", categoryId: "Office", desc: "Dr. Hossam Lahza" },
{ id: "234", name: "Dr. Fouad Bajaber Office - 234", floor: "F2", categoryId: "Office", desc: "Dr. Fouad Bajaber" },
{ id: "235", name: "Dr. Fawaz Al-Saadi Office - 235", floor: "F2", categoryId: "Office", desc: "Dr. Fawaz Al-Saadi" },
{ id: "240", name: "Dr. Mohammed Al-Haddad Office - 240", floor: "F2", categoryId: "Office", desc: "Dr. Mohammed Al-Haddad" },
{ id: "241", name: "Dr. Adel Khadidos Office - 241", floor: "F2", categoryId: "Office", desc: "Dr. Adel Khadidos" },
{ id: "245", name: "Dr. Fares Kateb Office - 245", floor: "F2", categoryId: "Office", desc: "Dr. Fares Kateb" },
{ id: "246", name: "Dr. Mohammed Al-Bashiri Office - 246", floor: "F2", categoryId: "Office", desc: "Dr. Mohammed Al-Bashiri" },
{ id: "247", name: "Dr. Madini Al-Asafi Office - 247", floor: "F2", categoryId: "Office", desc: "Dr. Madini Al-Asafi" },
{ id: "250", name: "Dr. Mahmoud Al-Rifai Office - 250", floor: "F2", categoryId: "Office", desc: "Dr. Mahmoud Rajab Al-Rifai" },
{ id: "253", name: "Dr. Ahmed Al-Zahrani Office - 253", floor: "F2", categoryId: "Office", desc: "Dr. Ahmed Al-Zahrani" },
{ id: "256", name: "Dr. Raed Al-Ghamdi Office - 256", floor: "F2", categoryId: "Office", desc: "Dr. Raed Al-Ghamdi" },
{ id: "257", name: "Dr. Awni Al-Sayed Office - 257", floor: "F2", categoryId: "Office", desc: "Dr. Awni Al-Sayed" },
{ id: "258", name: "Dr. Hassan Al-Tarazi Office - 258", floor: "F2", categoryId: "Office", desc: "Dr. Hassan Al-Tarazi" },
{ id: "260", name: "Dr. Reda Salamah Office - 260", floor: "F2", categoryId: "Office", desc: "Dr. Reda Salamah" },
{ id: "261", name: "Dr. Wajdi Al-Ghamdi Office - 261", floor: "F2", categoryId: "Office", desc: "Dr. Wajdi Al-Ghamdi" },
{ id: "272", name: "Dr. Khaled Al-Harbi Office - 272", floor: "F2", categoryId: "Office", desc: "Dr. Khaled Al-Harbi" },





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/*

// F1 examples (aligning with db.json names and categories)
{ id: "15F32", name: "Electrical room - 15F32", floor: "F1", categoryId: "Facilities", desc: "Electrical room" },

{ id: "15F27", name: "Server - 15F27", floor: "F1", categoryId: "Facilities", desc: "Server room" },
{ id: "15F26", name: "Utilities - 15F26", floor: "F1", categoryId: "Facilities", desc: "Utilities room" },
{ id: "15F23", name: "Janitor - 15F23", floor: "F1", categoryId: "Facilities", desc: "Janitor room" },
{ id: "15F21", name: "Electronic library - 15F21", floor: "F1", categoryId: "Facilities", desc: "Electronic library" },



{ id: "15F30-A", name: "L1-11 (first door) - 15F30-A", floor: "F1", categoryId: "Labs", desc: "Lab L1-11 first entrance" },
{ id: "15F30-B", name: "L1-11 (second door) - 15F30-B", floor: "F1", categoryId: "Labs", desc: "Lab L1-11 second entrance" },
{ id: "v1", name: "v1", floor: "F1", categoryId: "Other", desc: "Position v1" },
{ id: "15F20", name: "L1-9 - 15F20", floor: "F1", categoryId: "Labs", desc: "Lab L1-9" },
{ id: "15F19", name: "L1-8 - 15F19", floor: "F1", categoryId: "Labs", desc: "Lab L1-8" },
{ id: "15F18", name: "L1-7 - 15F18", floor: "F1", categoryId: "Labs", desc: "Lab L1-7" },
{ id: "15F17", name: "L1-6 - 15F17", floor: "F1", categoryId: "Labs", desc: "Lab L1-6" },

*/



/*
  // F1 generated from CSV (blank IDs filled with unique auto IDs)
  // Category mapping: Facility->Office (except Toilets->Bathroom), Others->Other
  { id: "F1-AUTO-001", name: "Elevator 1 - F1-AUTO-001", floor: "F1", categoryId: "Office", desc: "Elevator 1" },
  { id: "F1-AUTO-002", name: "Elevator 2 - F1-AUTO-002", floor: "F1", categoryId: "Office", desc: "Elevator 2" },
  { id: "F1-AUTO-003", name: "Emergency Exit - F1-AUTO-003", floor: "F1", categoryId: "Other", desc: "Emergency Exit" },
  { id: "F1-AUTO-004", name: "Exit - F1-AUTO-004", floor: "F1", categoryId: "Other", desc: "Exit" },
  { id: "F1-AUTO-005", name: "Elevator - F1-AUTO-005", floor: "F1", categoryId: "Office", desc: "Elevator" },
  { id: "F1-AUTO-006", name: "Exit Door - F1-AUTO-006", floor: "F1", categoryId: "Other", desc: "Exit Door" },
  { id: "F1-AUTO-007", name: "Front Door - F1-AUTO-007", floor: "F1", categoryId: "Other", desc: "Front Door" },
  { id: "F1-AUTO-008", name: "Door to other facilities - F1-AUTO-008", floor: "F1", categoryId: "Other", desc: "Door to other facilities" },
  { id: "F1-AUTO-009", name: "Door to L1-6 to L1-11 - F1-AUTO-009", floor: "F1", categoryId: "Other", desc: "Door to L1-6 to L1-11" },
  { id: "F1-AUTO-010", name: "Door to L1-1 to L1-5 - F1-AUTO-010", floor: "F1", categoryId: "Other", desc: "Door to L1-1 to L1-5" },
  { id: "F1-AUTO-011", name: "Toilets - F1-AUTO-011", floor: "F1", categoryId: "Bathroom", desc: "Toilets" },
  { id: "F1-AUTO-012", name: "Elevator 5 - F1-AUTO-012", floor: "F1", categoryId: "Office", desc: "Elevator 5" },

  // Added from provided CSV list (Floor 1). Duplicates use -A/-B suffixes to ensure uniqueness.
  { id: "15I04", name: "Electrical Room - 15I04", floor: "F1", categoryId: "Facilities", desc: "Electrical Room" },
  
  { id: "F1-AUTO-015", name: "Emergency Exit - F1-AUTO-015", floor: "F1", categoryId: "Other", desc: "Emergency Exit" },
  { id: "15I04-C", name: "Class Room - 15I04-C", floor: "F1", categoryId: "Class", desc: "Class Room" },
 
  { id: "15I22", name: "Lecture Room - 15I22", floor: "F1", categoryId: "Class", desc: "Lecture Room" },
  { id: "15I24A", name: "L1-14 to L1-17 Door - 15I24A", floor: "F1", categoryId: "Other", desc: "L1-14 to L1-17 Door" },
  { id: "15I24A-B", name: "H1-1 to H1-11 Door - 15I24A-B", floor: "F1", categoryId: "Other", desc: "H1-1 to H1-11 Door" },
  { id: "15I13", name: "Electrical Room - 15I13", floor: "F1", categoryId: "Facilities", desc: "Electrical Room" },
  { id: "15I12", name: "Janitor Room - 15I12", floor: "F1", categoryId: "Facilities", desc: "Janitor Room" },
  { id: "F1-AUTO-016", name: "Exit - F1-AUTO-016", floor: "F1", categoryId: "Other", desc: "Exit" },
  { id: "F1-AUTO-017", name: "Elevator - F1-AUTO-017", floor: "F1", categoryId: "Facilities", desc: "Elevator" },
  { id: "15I22A", name: "Class Room - 15I22A", floor: "F1", categoryId: "Class", desc: "Class Room" },
  { id: "15I22B", name: "Class Room - 15I22B", floor: "F1", categoryId: "Class", desc: "Class Room" },
  { id: "15I21", name: "Store Room - 15I21", floor: "F1", categoryId: "Facilities", desc: "Store Room" },
  { id: "F1-AUTO-018", name: "Exit - F1-AUTO-018", floor: "F1", categoryId: "Other", desc: "Exit" },
  { id: "15I14", name: "Server Room - 15I14", floor: "F1", categoryId: "Facilities", desc: "Server Room" },
  { id: "15I28", name: "Store Room - 15I28", floor: "F1", categoryId: "Facilities", desc: "Store Room" },
  { id: "15I25", name: "Communication Room - 15I25", floor: "F1", categoryId: "Facilities", desc: "Communication Room" },
  { id: "15I13-A", name: "L1-4 (Door 2) - 15I13-A", floor: "F1", categoryId: "Labs", desc: "L1-4 (Door 2)" },
  { id: "15I12-A", name: "L1-3 - 15I12-A", floor: "F1", categoryId: "Labs", desc: "L1-3" },
  { id: "F1-AUTO-019", name: "Exit - F1-AUTO-019", floor: "F1", categoryId: "Other", desc: "Exit" },
  { id: "15F06", name: "Elevator (Out of Service) - 15F06", floor: "F1", categoryId: "Facilities", desc: "Elevator (Out of Service)" },
  { id: "15F05", name: "Store Room - 15F05", floor: "F1", categoryId: "Facilities", desc: "Store Room" },
  { id: "15F05-A", name: "Room L1-05 (Door 2) - 15F05-A", floor: "F1", categoryId: "Other", desc: "Room L1-05 (Door 2)" },
  { id: "15F03", name: "Communications - 15F03", floor: "F1", categoryId: "Facilities", desc: "Communications" },
  { id: "15F02", name: "Electrical Room - 15F02", floor: "F1", categoryId: "Facilities", desc: "Electrical Room" },
  { id: "15F33-A", name: "Exit - 15F33-A", floor: "F1", categoryId: "Other", desc: "Exit" },
  { id: "15F32-A", name: "Electrical Room - 15F32-A", floor: "F1", categoryId: "Facilities", desc: "Electrical Room" },
  { id: "15F30", name: "L1-11 (Door1) - 15F30", floor: "F1", categoryId: "Labs", desc: "L1-11 (Door1)" },
  { id: "15F29", name: "L1-10 (Door 2) - 15F29", floor: "F1", categoryId: "Labs", desc: "L1-10 (Door 2)" },
  { id: "15F26-A", name: "Server Room - 15F26-A", floor: "F1", categoryId: "Facilities", desc: "Server Room" },
  { id: "F1-AUTO-020", name: "Exit Door - F1-AUTO-020", floor: "F1", categoryId: "Other", desc: "Exit Door" },
  { id: "15F23-A", name: "Janitor - 15F23-A", floor: "F1", categoryId: "Facilities", desc: "Janitor" },
  { id: "15F21-A", name: "Electronic Library - 15F21-A", floor: "F1", categoryId: "Labs", desc: "Electronic Library" },
  { id: "15F20-A", name: "L1-9 - 15F20-A", floor: "F1", categoryId: "Labs", desc: "L1-9" },
  { id: "15F19-A", name: "L1-8 - 15F19-A", floor: "F1", categoryId: "Labs", desc: "L1-8" },
  { id: "15F18-A", name: "L1-7 - 15F18-A", floor: "F1", categoryId: "Labs", desc: "L1-7" },
  { id: "15F17-A", name: "L1-6 - 15F17-A", floor: "F1", categoryId: "Labs", desc: "L1-6" },
  { id: "F1-AUTO-021", name: "Exit - F1-AUTO-021", floor: "F1", categoryId: "Other", desc: "Exit" },
  { id: "15I27-A", name: "Store Room - 15I27-A", floor: "F1", categoryId: "Facilities", desc: "Store Room" },
 
  { id: "F1-AUTO-022", name: "Exit Door - F1-AUTO-022", floor: "F1", categoryId: "Other", desc: "Exit Door" },
  { id: "15I04-D", name: "Toilets (Door 1) - 15I04-D", floor: "F1", categoryId: "Bathroom", desc: "Toilets (Door 1)" },
  { id: "15I04-E", name: "Toilets (Door 2) - 15I04-E", floor: "F1", categoryId: "Bathroom", desc: "Toilets (Door 2)" },
  { id: "F1-AUTO-023", name: "Exit Door - F1-AUTO-023", floor: "F1", categoryId: "Other", desc: "Exit Door" },
  { id: "F1-AUTO-024", name: "Front Door - F1-AUTO-024", floor: "F1", categoryId: "Other", desc: "Front Door" },
  { id: "F1-AUTO-025", name: "Door to other facilities - F1-AUTO-025", floor: "F1", categoryId: "Other", desc: "Door to other facilities" },
  { id: "F1-AUTO-026", name: "Exit Door - F1-AUTO-026", floor: "F1", categoryId: "Other", desc: "Exit Door" },
  { id: "F1-AUTO-027", name: "Door to other facilities - F1-AUTO-027", floor: "F1", categoryId: "Other", desc: "Door to other facilities" },
  
  { id: "15F33-B", name: "Seminar - 15F33-B", floor: "F1", categoryId: "Class", desc: "Seminar" },
  { id: "F1-AUTO-028", name: "Door to L1-6 to L1-11 - F1-AUTO-028", floor: "F1", categoryId: "Other", desc: "Door to L1-6 to L1-11" },
  { id: "F1-AUTO-029", name: "Exit Door - F1-AUTO-029", floor: "F1", categoryId: "Other", desc: "Exit Door" },
  { id: "F1-AUTO-030", name: "Door to L1-1 to L1-5 - F1-AUTO-030", floor: "F1", categoryId: "Other", desc: "Door to L1-1 to L1-5" },
  { id: "F1-AUTO-031", name: "Toilets - F1-AUTO-031", floor: "F1", categoryId: "Bathroom", desc: "Toilets" },
  
  { id: "F1-AUTO-032", name: "Door to L1-6 to L1-11 - F1-AUTO-032", floor: "F1", categoryId: "Other", desc: "Door to L1-6 to L1-11" },
  { id: "F1-AUTO-033", name: "Exit Door - F1-AUTO-033", floor: "F1", categoryId: "Other", desc: "Exit Door" },
  { id: "F1-AUTO-034", name: "Door to L1-1 to L1-5 - F1-AUTO-034", floor: "F1", categoryId: "Other", desc: "Door to L1-1 to L1-5" },
  { id: "15I02", name: "Unknown - 15I02", floor: "F1", categoryId: "Other", desc: "Unknown" },


  // F2 examples (duplicate names are allowed across floors if IDs differ)
  // Adjust IDs if your backend distinguishes floors per object; names can be same across floors.
  
  { id: "f2_mainhall", name: "Main Hall - f2_mainhall", floor: "F2", categoryId: "Other", desc: "Lower main hall - F2" },
  { id: "f2_mainhallway", name: "Main Hallway - f2_mainhallway", floor: "F2", categoryId: "Other", desc: "Main central hallway - F2" },
  { id: "f2_labhallway1", name: "Lab Hallway 1 - f2_labhallway1", floor: "F2", categoryId: "Lab", desc: "Lab hallway - F2" },
  { id: "f2_bath1", name: "Bathroom 1 - f2_bath1", floor: "F2", categoryId: "Bathroom", desc: "Lower left bathroom - F2" },
  { id: "f2_bath2", name: "Bathroom 2 - f2_bath2", floor: "F2", categoryId: "Bathroom", desc: "Right bathroom - F2" },
  { id: "f2_bath3", name: "Bathroom 3 - f2_bath3", floor: "F2", categoryId: "Bathroom", desc: "Left bathroom - F2" },
  { id: "f2_bath4", name: "Bathroom 4 - f2_bath4", floor: "F2", categoryId: "Bathroom", desc: "Upper left bathroom - F2" },
  */
];

// Sorted catalog: by floor, then categoryId, then name, and finally by id (descending)
export const roomsCatalog: RoomRecord[] = [...roomsCatalogRaw].sort((a, b) => {
  // 1) Floor (F1 then F2)
  if (a.floor !== b.floor) {
    return a.floor.localeCompare(b.floor);
  }
  // 2) Category
  const categoryCmp = a.categoryId.localeCompare(b.categoryId);
  if (categoryCmp !== 0) return categoryCmp;

  // 3) Name (group similar names together)
  const nameCmp = a.name.localeCompare(b.name);
  if (nameCmp !== 0) return nameCmp;

  // 4) Id (descending)
  return b.id.localeCompare(a.id);
  
});

export default roomsCatalog;
