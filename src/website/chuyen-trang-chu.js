!function () {
  var n = String(location.hostname || "").toLowerCase();
  if ("thienthuonline.vn" !== n && "www.thienthuonline.vn" !== n) {
    if (!(/(?:^|[?&])choi(?:[=&]|$)/.test(location.search || "") || "tutien2d.online" !== n && "www.tutien2d.online" !== n && "tutien2d.com" !== n && "www.tutien2d.com" !== n)) {
      location.replace("/trang-chu.html");
    }
  }
  else {
    location.replace("/tai-game");
  }
}();
