const getParam = (name, url) => {
  if (!url) url = location.href;
  console.log("url", url);
  name = name.replace(/[\\[]/, "\\\\[").replace(/[\]]/, "\\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  console.log("results", results);
  return results == null ? null : results[1];
};

export { getParam };
