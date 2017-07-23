var map = {
	// 风险说明：-1 风险未知 0:无风险 1:低风险 2:中风险 3:高风险

	// 身份证：
	rate: {
		'0': '无风险',
		'1': '低风险',
		'2': '中风险',
		'3': '高风险',
		'-1': '风险未知',
	},
	"CERTNO_Match_Sharing_Bad": {
		msg: "身份证号与其他信息匹配，但匹配后的信息被多个用户使用",
		rate: 2
	},
	"CERTNO_Match_Trust_Self_Sharing_Bad": {
		msg: "身份证号与其他信息匹配，但匹配后的信息被多个用户使用",
		rate: 2
	},
	"CERTNO_Match_Sharing_Good": {
		msg: "身份证号与其他信息匹配，匹配后的信息仅被一个用户使用",
		rate: 0
	},
	"CERTNO_Match_Trust_Self_Sharing_Good": {
		msg: "身份证号与其他信息匹配，匹配后的信息仅被一个用户使用",
		rate: 0
	},
	"CERTNO_Match_Recency_Bad": {
		msg: "身份证号与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 1
	},
	"CERTNO_Match_Trust_Self_Recency_Bad": {
		msg: "身份证号与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 1
	},
	"CERTNO_Match_Recency_Good": {
		msg: "身份证号与其他信息匹配，匹配后的信息近期较活跃",
		rate: 0
	},
	"CERTNO_Match_Trust_Self_Recency_Good": {
		msg: "身份证号与其他信息匹配，匹配后的信息近期较活跃",
		rate: 0
	},
	"CERTNO_Match_Reliability_Bad": {
		msg: "身份证号与其他信息匹配，但匹配后的信息未经认证",
		rate: 2
	},
	"CERTNO_Match_Trust_Self_Reliability_Bad": {
		msg: "身份证号与其他信息匹配，但匹配后的信息未经认证",
		rate: 2
	},
	"CERTNO_Match_Reliability_Good": {
		msg: "身份证号与其他信息匹配，匹配后的信息经过认证",
		rate: 0
	},
	"CERTNO_Match_Trust_Self_Reliability_Good": {
		msg: "身份证号与其他信息匹配，匹配后的信息经过认证",
		rate: 0
	},
	"CERTNO_Match_Trust_Other_Sharing_Good": {
		msg: "身份证号与其他信息不匹配",
		rate: 3
	},
	"CERTNO_Match_Trust_Other_Sharing_Bad": {
		msg: "身份证号与其他信息不匹配",
		rate: 3
	},
	"CERTNO_Match_Trust_Other_Recency_Good": {
		msg: "身份证号与其他信息不匹配",
		rate: 3
	},
	"CERTNO_Match_Trust_Other_Recency_Bad": {
		msg: "身份证号与其他信息不匹配",
		rate: 3
	},
	"CERTNO_Match_Trust_Other_Reliability_Good": {
		msg: "身份证号与其他信息不匹配",
		rate: 3
	},
	"CERTNO_Match_Trust_Other_Reliability_Bad": {
		msg: "身份证号与其他信息不匹配",
		rate: 3
	},
	"CERTNO_Mismatch": {
		msg: "身份证号与其他信息不匹配",
		rate: 3
	},
	"CERTNO_History_NegativeList": {
		msg: "身份证号存在欺诈记录",
		rate: 3
	},
	"CERTNO_Missing": {
		msg: "无法找到身份证号的有效记录",
		rate: -1
	},
	// 姓名
	"NAME_Match_Sharing_Bad": {
		msg: "姓名与其他信息匹配，但匹配后的信息被多个用户使用",
		rate: 2
	},
	"NAME_Match_Sharing_Good": {
		msg: "姓名与其他信息匹配，匹配后的信息仅被一个用户使用",
		rate: 0
	},
	"NAME_Match_Recency_Bad": {
		msg: "姓名与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 2
	},
	"NAME_Match_Recency_Good": {
		msg: "姓名与其他信息匹配，匹配后的信息近期较活跃",
		rate: 0
	},
	"NAME_Match_Reliability_Bad": {
		msg: "姓名与其他信息匹配，但匹配后的信息未经认证",
		rate: 2
	},
	"NAME_Match_Reliability_Good": {
		msg: "姓名与其他信息匹配，匹配后的信息经过认证",
		rate: 0
	},
	"NAME_Mismatch": {
		msg: "姓名与其他信息不匹配",
		rate: 3
	},

	// EMAIL
	"EMAIL_Match_Sharing_Bad": {
		msg: "电子邮箱与其他信息匹配，但匹配后的信息被多个用户使用",
		rate: 2
	},
	"EMAIL_Match_Trust_Self_Sharing_Bad": {
		msg: "电子邮箱与其他信息匹配，但匹配后的信息被多个用户使用",
		rate: 2
	},
	"EMAIL_Match_Sharing_Good": {
		msg: "电子邮箱与其他信息匹配，匹配后的信息被一个用户使用",
		rate: 0
	},
	"EMAIL_Match_Trust_Self_Sharing_Good": {
		msg: "电子邮箱与其他信息匹配，匹配后的信息被一个用户使用",
		rate: 0
	},
	"EMAIL_Match_Recency_Bad": {
		msg: "电子邮箱与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 1
	},
	"EMAIL_Match_Trust_Self_Recency_Bad": {
		msg: "电子邮箱与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 1
	},
	"EMAIL_Match_Recency_Good": {
		msg: "电子邮箱与其他信息匹配，匹配后的信息近期较活跃",
		rate: 0
	},
	"EMAIL_Match_Trust_Self_Recency_Good": {
		msg: "电子邮箱与其他信息匹配，匹配后的信息近期较活跃",
		rate: 0
	},
	"EMAIL_Match_Reliability_Bad": {
		msg: "电子邮箱与其他信息匹配，但匹配后的信息未经认证",
		rate: 2
	},
	"EMAIL_Match_Trust_Self_Reliability_Bad": {
		msg: "电子邮箱与其他信息匹配，但匹配后的信息未经认证",
		rate: 2
	},
	"EMAIL_Match_Reliability_Good": {
		msg: "电子邮箱与其他信息匹配，匹配后的信息经过认证",
		rate: 0
	},
	"EMAIL_Match_Trust_Self_Reliability_Good": {
		msg: "电子邮箱与其他信息匹配，匹配后的信息经过认证",
		rate: 0
	},
	"EMAIL_Match_Trust_Other": {
		msg: "电子邮箱与其他信息匹配，但不是常用的电子邮箱",
		rate: 1
	},
	"EMAIL_Mismatch": {
		msg: "电子邮箱与其他信息不匹配",
		rate: 2
	},
	"EMAIL_History_NegativeList": {
		msg: "电子邮箱存在欺诈记录",
		rate: 3
	},
	"EMAIL_Missing": {
		msg: "无法找到电子邮箱的有效记录",
		rate: -1
	},
	// PHONE
	"PHONE_Match_Sharing_Bad": {
		msg: "电话号码与其他信息匹配，但匹配后的信息被多个用户使用",
		rate: 2
	},
	"PHONE_Match_Trust_Self_Sharing_Bad": {
		msg: "电话号码与其他信息匹配，但匹配后的信息被多个用户使用",
		rate: 2
	},
	"PHONE_Match_Sharing_Good": {
		msg: "电话号码与其他信息匹配，匹配后的信息被一个用户使用",
		rate: 0
	},
	"PHONE_Match_Trust_Self_Sharing_Good": {
		msg: "电话号码与其他信息匹配，匹配后的信息被一个用户使用",
		rate: 0
	},
	"PHONE_Match_Recency_Bad": {
		msg: "电话号码与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 1
	},
	"PHONE_Match_Trust_Self_Recency_Bad": {
		msg: "电话号码与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 1
	},
	"PHONE_Match_Recency_Good": {
		msg: "电话号码与其他信息匹配，匹配后的信息近期活跃",
		rate: 0
	},
	"PHONE_Match_Trust_Self_Recency_Good": {
		msg: "电话号码与其他信息匹配，匹配后的信息近期活跃",
		rate: 0
	},
	"PHONE_Match_Reliability_Bad": {
		msg: "电话号码与其他信息匹配，但匹配后的信息未经认证",
		rate: 1
	},
	"PHONE_Match_Trust_Self_Reliability_Bad": {
		msg: "电话号码与其他信息匹配，但匹配后的信息未经认证",
		rate: 1
	},
	"PHONE_Match_Reliability_Good": {
		msg: "电话号码与其他信息匹配，匹配后的信息经过认证",
		rate: 0
	},
	"PHONE_Match_Trust_Self_Reliability_Good": {
		msg: "电话号码与其他信息匹配，匹配后的信息经过认证",
		rate: 0
	},
	"PHONE_Match_Trust_Other": {
		msg: "电话号码与其他信息匹配，但不是常用的电话号码",
		rate: 1
	},
	"PHONE_Mismatch": {
		msg: "电话号码与其他信息不匹配",
		rate: 3
	},
	"PHONE_History_NegativeList": {
		msg: "电话号码存在欺诈记录",
		rate: 3
	},
	"PHONE_Missing": {
		msg: "无法找到电话号码的有效记录",
		rate: -1
	},
	// BANKCARD
	"BANKCARD_Match_Sharing_Bad": {
		msg: "银行卡号与其他信息匹配，但匹配后的信息被多个用户使用",
		rate: 2
	},
	"BANKCARD_Match_Trust_Self_Sharing_Bad": {
		msg: "银行卡号与其他信息匹配，但匹配后的信息被多个用户使用",
		rate: 2
	},
	"BANKCARD_Match_Sharing_Good": {
		msg: "银行卡号与其他信息匹配，匹配后的信息被一个用户使用",
		rate: 0
	},
	"BANKCARD_Match_Trust_Self_Sharing_Good": {
		msg: "银行卡号与其他信息匹配，匹配后的信息被一个用户使用",
		rate: 0
	},
	"BANKCARD_Match_Recency_Bad": {
		msg: "银行卡号与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 1
	},
	"BANKCARD_Match_Trust_Self_Recency_Bad": {
		msg: "银行卡号与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 1
	},
	"BANKCARD_Match_Recency_Good": {
		msg: "银行卡号与其他信息匹配，匹配后的信息近期活跃",
		rate: 0
	},
	"BANKCARD_Match_Trust_Self_Recency_Good": {
		msg: "银行卡号与其他信息匹配，匹配后的信息近期活跃",
		rate: 0
	},
	"BANKCARD_Match_Reliability_Bad": {
		msg: "银行卡号与其他信息匹配，但匹配后的信息未经认证",
		rate: 2
	},
	"BANKCARD_Match_Trust_Self_Reliability_Bad": {
		msg: "银行卡号与其他信息匹配，但匹配后的信息未经认证",
		rate: 2
	},
	"BANKCARD_Match_Reliability_Good": {
		msg: "银行卡号与其他信息匹配，匹配后的信息经过认证",
		rate: 0
	},
	"BANKCARD_Match_Trust_Self_Reliability_Good": {
		msg: "银行卡号与其他信息匹配，匹配后的信息经过认证",
		rate: 0
	},
	"BANKCARD_Match_Trust_Other": {
		msg: "银行卡号与其他信息匹配，但不是常用的银行卡号",
		rate: 1
	},
	"BANKCARD_Mismatch": {
		msg: "银行卡号与其他信息不匹配",
		rate: 3
	},
	"BANKCARD_History_NegativeList": {
		msg: "银行卡号存在欺诈记录",
		rate: 3
	},
	"BANKCARD_Missing": {
		msg: "无法找到银行卡号的有效记录",
		rate: -1
	},
	// ADDR
	"ADDR_Match_Recency_Bad": {
		msg: "地址与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 1
	},
	"ADDR_Match_Trust_Self_Recency_Bad": {
		msg: "地址与其他信息匹配，但匹配后的信息近期不活跃",
		rate: 1
	},
	"ADDR_Match_Recency_Good": {
		msg: "地址与其他信息匹配，匹配后的信息近期活跃",
		rate: 0
	},
	"ADDR_Match_Trust_Self_Recency_Good": {
		msg: "地址与其他信息匹配，匹配后的信息近期活跃",
		rate: 0
	},
	"ADDR_Match_Trust_Other": {
		msg: "地址与其他信息匹配，但不是常用的地址",
		rate: 1
	},
	"ADDR_Mismatch": {
		msg: "地址与其他信息不匹配",
		rate: 3
	},
	// IP
	"IP_Match": {
		msg: "常用的IP地址",
		rate: 0
	},
	"IP_Match_Trust": {
		msg: "常用的IP地址",
		rate: 0
	},
	"IP_Mismatch": {
		msg: "IP地址与其他信息不匹配",
		rate: 2
	},
	"IP_Missing": {
		msg: "无法找到IP地址的有效记录",
		rate: -1
	},
	// IMSI
	"IMSI_Match_Sharing_Bad": {
		msg: "常用的IMSI码，被多个用户使用",
		rate: 2
	},
	"IMSI_Match_Trust_Self_Sharing_Bad": {
		msg: "常用的IMSI码，被多个用户使用",
		rate: 2
	},
	"IMSI_Match_Sharing_Good": {
		msg: "常用的IMSI码，被一个用户使用",
		rate: 0
	},
	"IMSI_Match_Trust_Self_Sharing_Good": {
		msg: "常用的IMSI码，被一个用户使用",
		rate: 0
	},
	"IMSI_Mismatch": {
		msg: "IMSI码与其他信息不匹配",
		rate: 2
	},
	"IMSI_History_NegativeList": {
		msg: "IMSI码存在欺诈记录",
		rate: 3
	},
	"IMSI_Missing": {
		msg: "无法找到IMSI码的有效记录",
		rate: -1
	},
	// IMEI
	"IMEI_Match_Sharing_Bad": {
		msg: "常用的IMEI码，被多个用户使用",
		rate: 2
	},
	"IMEI_Match_Trust_Self_Sharing_Bad": {
		msg: "常用的IMEI码，被多个用户使用",
		rate: 2
	},
	"IMEI_Match_Sharing_Good": {
		msg: "常用的IMEI码，被一个用户使用",
		rate: 0
	},
	"IMEI_Match_Trust_Self_Sharing_Good": {
		msg: "常用的IMEI码，被一个用户使用",
		rate: 0
	},
	"IMEI_Mismatch": {
		msg: "IMEI码与其他信息不匹配",
		rate: 2
	},
	"IMEI_History_NegativeList": {
		msg: "IMEI码存在欺诈记录",
		rate: 3
	},
	"IMEI_Missing": {
		msg: "无法找到IMEI码的有效记录",
		rate: -1
	},
	// MAC
	"MAC_Match_Sharing_Bad": {
		msg: "常用的MAC地址，被多个用户使用",
		rate: 2
	},
	"MAC_Match_Trust_Self_Sharing_Bad": {
		msg: "常用的MAC地址，被多个用户使用",
		rate: 2
	},
	"MAC_Match_Sharing_Good": {
		msg: "常用的MAC地址，被一个用户使用",
		rate: 0
	},
	"MAC_Match_Trust_Self_Sharing_Good": {
		msg: "常用的MAC地址，被一个用户使用",
		rate: 0
	},
	"MAC_Mismatch": {
		msg: "MAC地址与其他信息不匹配",
		rate: 2
	},
	"MAC_History_NegativeList": {
		msg: "MAC地址存在欺诈记录",
		rate: 3
	},
	"MAC_Missing": {
		msg: "无法找到MAC地址的有效记录",
		rate: -1
	},
	// WIFI-MAC
	"WIFI-MAC_Match": {
		msg: "常用的无线网关MAC地址",
		rate: 0
	},
	"WIFI-MAC_Match_Trust": {
		msg: "常用的无线网关MAC地址",
		rate: 0
	},
	"WIFI-MAC_Mismatch": {
		msg: "无线网关MAC地址与其他信息不匹配",
		rate: 2
	},
	"WIFI-MAC_History_NegativeList": {
		msg: "无线网关MAC地址存在欺诈记录",
		rate: 3
	},
	"WIFI-MAC_Missing": {
		msg: "无法找到无线网关MAC地址的有效记录",
		rate: -1
	},
}

export default map