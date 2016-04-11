/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city = document.getElementById('aqi-city-input'),
    weather = document.getElementById('aqi-value-input'),
    tableList = document.getElementById('aqi-table');

// 验证用户输入的城市名必须为中英文字符，
function citymatch (city) {
	var pattern = /^[A-Za-z\u4E00-\u9FA5]+$/;
	return pattern.test(city);
}
//验证用户输入的空气质量指数必须为整数
function weathermatch (weather) {
	var pattern = /^-?[1-9]\d*$/;
	return pattern.test(weather);
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityvalue = city.value.trim();
	var weathervalue = weather.value.trim();
	if (!citymatch(cityvalue)) {
		alert("城市名必须为中英文字符");
		return;
	}
	if (!weathermatch(weathervalue)) {
		alert("空气质量指数必须为整数");
		return;
	}
	aqiData[cityvalue] = weathervalue;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var list = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for (var i in aqiData) {
		list += "<tr><td>" + i + "</td><td>" + aqiData[i] + "</td><td><button title=\"" + i + "\">删除</button></td></tr>";
	}
	if (i) {
		tableList.innerHTML = list;
	} else{
		tableList.innerHTML = "";
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
	delete aqiData[city];

	renderAqiList();
}

function init() {

	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById('add-btn').addEventListener("click", addBtnHandle);
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	tableList.addEventListener("click", function (event) {
		if (event.target.nodeName.toLowerCase() == "button") {
			delBtnHandle.call(tableList,event.target.title);
		}
	});
}

init();