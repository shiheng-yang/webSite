//年月日
function yearToDay(time) {
  var y = time.getFullYear(),
  m = time.getMonth() + 1,
  d = time.getDate();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  return y + "-" + m + "-" + d;
};
//年月日时分秒
function yearToSecond(time) {
  var h = time.getHours(),
  i = time.getMinutes(),
  s = time.getSeconds(),
  h = h < 10 ? "0" + h : h;
  i = i < 10 ? "0" + i : i;
  s = s < 10 ? "0" + s : s;
  return yearToDay(time) + ' ' + h + ':' + i + ':' + s;
};
//年月日补0
function yearToZero(){
  return yearToDay(time)+ " 00:00:00"
}
export default{yearToSecond,yearToDay,yearToZero}