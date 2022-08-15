// App script to simply paste a time stamp at the current cursor location
// - Also allows you to "Go to the end of the documnet" 
// - US central time is assumed: change 
// Yoonsuck Choe
// choe@tamu.edu
// 08/15/2022 

//-------------
// CONFIG : time zone
//-------------
var timezone = "GMT+6";  // change this to match your time zone

//-------------
// Add Menu when Document is launched
//-------------
function onOpen() {
  var ui = DocumentApp.getUi();
  
  ui.createMenu('Custom')
      .addItem('Time stamp', 'timeStamp')
      .addItem('Goto End','gotoEnd')
      .addToUi();
}

//-------------
// Go to the end of the document
//-------------
function gotoEnd() {

  // source:  https://stackoverflow.com/questions/55920739/move-to-last-line-of-google-document-when-it-is-opened

  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var numChildren = body.getNumChildren();
  var pos = doc.newPosition(body.getChild(numChildren - 1),0);
  doc.setCursor(pos);

}

//-------------
// Timestamp at current cursor location (no error checks!)
//-------------
function timeStamp() {

  // get document
  var body = DocumentApp.getActiveDocument().getBody();

  // get current cursor location
  var cursor = DocumentApp.getActiveDocument().getCursor();

  if (cursor) {
    var date = Utilities.formatDate(new Date(), timezone, "MM/dd/yyyy hh:mm:ss")
    var str = date + " " + timezone
    cursor.insertText(str)
    
  } 

  // move cursor to the end of the time stamp string
  const doc = DocumentApp.getActiveDocument();
  doc.setCursor(doc.newPosition(cursor.getElement(), cursor.getOffset() + 1));
}

