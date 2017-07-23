function getAD(ad) {
	switch (ad) {
		case "CN":
			return "身份证号";
		case "NM":
			return "姓名";
		case "PH":
			return "手机号码";
		case "BC":
			return "银行号码";
		case "AD":
			return "地址";
		case "EM":
			return "EMAIL";
		case "IP":
			return "IP";
		case "MC":
			return "MAC";
		case "WF":
			return "WIFI-MAC";
		case "IM":
			return "IMEI";
	}
}

function getCN(cn) {
	switch (cn) {
		case "CN":
			return "与本人";
		case "PH":
			return "与本人手机";
		case "NM":
			return "与本人姓名";
	}
}

function getMA(ma) {
	switch (ma) {
		case "MA":
			return "信息匹配";
		case "UM":
			return "信息不匹配";
		case "UK":
			return "信息匹配未知";
	}
}

function getUL(ul) {
	var use = ul.substr(0, 2);
	if (use == 'UL') {
		var days = ul.substr(2);
		switch (days) {
			case "30D":
				return "30天内有使用";
			case "90D":
				return "距今[30, 90)天内有使用";
			case "180D":
				return "距今[90, 180)天内有使用";
			case "360D":
				return "距今[180, 360)天内有使用";
		}
	} else {
		var days = ul.substr(2);
		switch (days) {
			case "30D":
				return "30天内没有使用";
			case "90D":
				return "90天内没有使用";
			case "180D":
				return "180天内没有使用";
			case "360D":
				return "360天内没有使用";
		}
	}

}

function fanqizha(cd) {
	switch (cd) {
		// CERTNO
		case "R_CN_001":
			return {
				"msg": "身份证号击中网络欺诈风险名单",
				rate: 2
			};
		case "R_CN_002":
			return {
				"msg": "身份证号曾经被泄露",
				rate: 1
			};
		case "R_CN_003":
			return {
				"msg": "身份证号曾经被冒用",
				rate: 1
			};
		case "R_CN_004":
			return {
				"msg": "身份证号出现在风险关联网络",
				rate: 1
			};
		case "R_CN_JJ_01":
			return {
				"msg": "身份证当天在多个商户申请",
				rate: 2
			};
		case "R_CN_JJ_02":
			return {
				"msg": "身份证近一周（不包含当天）在多个商户申请",
				rate: 2
			};
		case "R_CN_JJ_03":
			return {
				"msg": "身份证近一月（不包含当天）在多个商户申请",
				rate: 2
			};

			// PHONE
		case "R_PH_001":
			return {
				"msg": "手机号击中网络欺诈风险名单",
				rate: 2
			};
		case "R_PH_002":
			return {
				"msg": "手机号疑似多个用户共用",
				rate: 1
			};
		case "R_PH_003":
			return {
				"msg": "手机号疑似虚拟运营商小号",
				rate: 2
			};
		case "R_PH_004":
			return {
				"msg": "手机号疑似二次放号",
				rate: 3
			};
		case "R_PH_005":
			return {
				"msg": "手机号失联风险高",
				rate: 3
			};
		case "R_PH_006":
			return {
				"msg": "手机稳定性弱",
				rate: 1
			};
		case "R_PH_JJ_01":
			return {
				"msg": "手机号当天在多个商户申请",
				rate: 2
			};
		case "R_PH_JJ_02":
			return {
				"msg": "手机号近一周（不包含当天）在多个商户申请",
				rate: 2
			};
		case "R_PH_JJ_03":
			return {
				"msg": "手机号近一月（不包含当天）在多个商户申请",
				rate: 2
			};

			// BANK CARD
		case "R_BC_001":
			return {
				"msg": "银行卡击中网络欺诈风险名单",
				rate: 2
			};
		case "R_BC_002":
			return {
				"msg": "银行卡曾经被泄露",
				rate: 1
			};
		case "R_BC_003":
			return {
				"msg": "银行卡曾经被冒用",
				rate: 1
			};

			// ADDRESS
		case "R_AD_001":
			return {
				"msg": "疑似虚假地址",
				rate: 2
			};

			// MAC（申请设备）
		case "R_MC_001":
			return {
				"msg": "疑似篡改的MAC",
				rate: 2
			};
		case "R_MC_002":
			return {
				"msg": "MAC击中网络欺诈风险名单",
				rate: 2
			};
		case "R_MC_003":
			return {
				"msg": "手机MAC近期内不活跃",
				rate: 1
			};
		case "R_MC_004":
			return {
				"msg": "手机MAC较新",
				rate: 1
			};
		case "R_MC_005":
			return {
				"msg": "恶意攻击MAC",
				rate: 2
			};
		case "R_MC_006":
			return {
				"msg": "疑似中介MAC",
				rate: 2
			};
		case "R_MC_JJ_01":
			return {
				"msg": "当天在多个用户通过该MAC申请",
				rate: 2
			};
		case "R_MC_JJ_02":
			return {
				"msg": "近一周（不包含当天）多个用户通过该MAC申请",
				rate: 2
			};
		case "R_MC_JJ_03":
			return {
				"msg": "近一月（不包含当天）多个用户通过该MAC申请",
				rate: 2
			};

			// IP
		case "R_IP_001":
			return {
				"msg": "代理IP",
				rate: 2
			};
		case "R_IP_002":
			return {
				"msg": "服务器IP",
				rate: 1
			};
		case "R_IP_003":
			return {
				"msg": "热点IP",
				rate: 1
			};
		case "R_IP_004":
			return {
				"msg": "IP近期不活跃",
				rate: 1
			};
		case "R_IP_005":
			return {
				"msg": "IP较新",
				rate: 1
			};
		case "R_IP_006":
			return {
				"msg": "IP上聚集多个设备",
				rate: 1
			};
		case "R_IP_007":
			return {
				"msg": "IP上设备分布异常",
				rate: 1
			};
		case "R_IP_008":
			return {
				"msg": "疑似中介IP",
				rate: 2
			};
		case "R_IP_JJ_01":
			return {
				"msg": "当天在多个用户通过该IP申请",
				rate: 2
			};
		case "R_IP_JJ_02":
			return {
				"msg": "近一周（不包含当天）多个用户通过该IP申请",
				rate: 2
			};
		case "R_IP_JJ_03":
			return {
				"msg": "近一月（不包含当天）多个用户通过该IP申请",
				rate: 2
			};

			// IMEI
		case "R_IM_001":
			return {
				"msg": "IMEI击中网络欺诈风险名单",
				rate: 2
			};
		case "R_IM_002":
			return {
				"msg": "IMEI近期不活跃",
				rate: 1
			};
		case "R_IM_003":
			return {
				"msg": "IMEI较新",
				rate: 1
			};
		case "R_IM_004":
			return {
				"msg": "疑似虚假IMEI",
				rate: 2
			};
		case "R_IM_JJ_01":
			return {
				"msg": "当天在多个用户通过该IMEI申请",
				rate: 2
			};
		case "R_IM_JJ_02":
			return {
				"msg": "近一周（不包含当天）多个用户通过该IMEI申请",
				rate: 2
			};
		case "R_IM_JJ_03":
			return {
				"msg": "近一月（不包含当天）多个用户通过该IMEI申请",
				rate: 2
			};

	}
}

function rcode(code) {
	var strs = code.split("_");
	var len = strs.length;
	var cn, ma, ul;
	var ad = cn = ma = ul = "";
	if (strs[0] !== 'V') {
		return stringify(fanqizha(code));
	}
	if (strs[1] !== undefined) {
		// 校验的信息项
		ad = getAD(strs[1]);
	}
	if (strs[2] !== undefined) {
		// 校验的信息项
		if (strs[2] == "NA") {
			return "查询不到" + ad + "信息";
		}
		cn = getCN(strs[2]);
	}
	if (strs[3] !== undefined) {
		// 校验的信息项
		ma = getMA(strs[3]);
	}
	if (strs[4] !== undefined) {
		// 校验的信息项
		ul = getUL(strs[4]);
	}
	// console.log("hello");
	if (ul == "") return ad + cn + ma;
	return ad + cn + ma + "," + ul;
}
// console.log(rcode("V_PH_CN_MA_UL360D"));
// console.log(rcode("V_PH_CN_MA_UL90D"));
// console.log(rcode("V_PH_CN_MA_UM360D"));
// console.log(rcode("V_PH_NM_MA_UM360D"));

function stringify(obj) {
	var risk
	switch (obj.rate) {
		case 0:
			risk = '无'
			break
		case 1:
			risk = '低'
			break
		case 2:
			risk = '中'
			break
		case 3:
			risk = '高'
			break
	}
	return obj.msg + ' 风险指数：' + risk
}
var parseAntifraud = {}
parseAntifraud.parse = rcode
export default parseAntifraud