!function () {
  var t = String(location.hostname || "").toLowerCase();
  if (!(/(?:^|[?&])choi(?:[=&]|$)/.test(location.search || "") || "tutien2d.online" !== t && "www.tutien2d.online" !== t)) {
    location.replace("/trang-chu.html");
  }
}();
