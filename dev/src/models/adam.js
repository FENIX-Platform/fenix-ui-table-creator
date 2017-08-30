module.exports = {
    "metadata" : {
        "version" : "47769314156334088227536801033458683937",
        "dsd" : {
            "cache" : {
                "storage" : "postgres"
            },
            "rid" : "63_376",
            "columns" : [ {
                "dataType" : "code",
                "key" : true,
                "id" : "recipientcode",
                "title" : {
                    "EN" : "Recipient Country"
                },
                "domain" : {
                    "codes" : [ {
                        "extendedName" : {
                            "EN" : "OECD Recipients"
                        },
                        "version" : "2016",
                        "idCodeList" : "crs_recipients"
                    } ]
                }
            }, {
                "dataType" : "code",
                "key" : true,
                "id" : "donorcode",
                "title" : {
                    "EN" : "Resource Partner"
                },
                "domain" : {
                    "codes" : [ {
                        "extendedName" : {
                            "EN" : "OECD Donors"
                        },
                        "version" : "2016",
                        "idCodeList" : "crs_donors"
                    } ]
                }
            }, {
                "dataType" : "text",
                "key" : true,
                "id" : "projecttitle",
                "title" : {
                    "EN" : "Project title"
                }
            }, {
                "dataType" : "year",
                "key" : true,
                "id" : "year",
                "title" : {
                    "EN" : "Year"
                },
                "subject" : "time"
            }, {
                "dataType" : "code",
                "key" : true,
                "id" : "parentsector_code",
                "title" : {
                    "EN" : "Parent sector"
                },
                "domain" : {
                    "codes" : [ {
                        "extendedName" : {
                            "EN" : "OECD Dac"
                        },
                        "version" : "2016",
                        "idCodeList" : "crs_dac"
                    } ]
                }
            }, {
                "dataType" : "code",
                "key" : true,
                "id" : "purposecode",
                "title" : {
                    "EN" : "Sub-sector"
                },
                "domain" : {
                    "codes" : [ {
                        "extendedName" : {
                            "EN" : "OECD Purposes"
                        },
                        "version" : "2016",
                        "idCodeList" : "crs_purposes"
                    } ]
                }
            }, {
                "dataType" : "number",
                "id" : "value",
                "title" : {
                    "EN" : "Value"
                },
                "subject" : "value"
            }, {
                "dataType" : "code",
                "id" : "unitcode",
                "title" : {
                    "EN" : "Measurement unit"
                },
                "domain" : {
                    "codes" : [ {
                        "extendedName" : {
                            "EN" : "OECD Units"
                        },
                        "version" : "2016",
                        "idCodeList" : "crs_units"
                    } ]
                },
                "subject" : "um"
            }, {
                "dataType" : "text",
                "key" : false,
                "id" : "recipientcode_EN",
                "title" : {
                    "EN" : "Recipient Country"
                },
                "transposed" : false,
                "virtual" : false
            }, {
                "dataType" : "text",
                "key" : false,
                "id" : "donorcode_EN",
                "title" : {
                    "EN" : "Resource Partner"
                },
                "transposed" : false,
                "virtual" : false
            }, {
                "dataType" : "text",
                "key" : false,
                "id" : "parentsector_code_EN",
                "title" : {
                    "EN" : "Parent sector"
                },
                "transposed" : false,
                "virtual" : false
            }, {
                "dataType" : "text",
                "key" : false,
                "id" : "purposecode_EN",
                "title" : {
                    "EN" : "Sub-sector"
                },
                "transposed" : false,
                "virtual" : false
            }, {
                "dataType" : "text",
                "key" : false,
                "id" : "unitcode_EN",
                "title" : {
                    "EN" : "Measurement unit"
                },
                "transposed" : false,
                "virtual" : false
            } ],
            "contextSystem" : "D3P"
        },
        "uid" : "D3P_R_2",
        "meContent" : {
            "resourceRepresentationTypeLabel" : {
                "EN" : "Dataset"
            },
            "resourceRepresentationType" : "dataset"
        }
    },
    "data" : [ [ "625", "1", "Women's refuge in Nimruz", 2006, "150", "15170", 0.03, "million_usd", "Afghanistan", "Austria", "Government and civil society", "Women's equality organisations and institutions", "Million USD" ], [ "625", "1", "WOMEN'S REFUGE IN NIMRUZ", 2005, "150", "15170", 0.02, "million_usd", "Afghanistan", "Austria", "Government and civil society", "Women's equality organisations and institutions", "Million USD" ], [ "625", "1", "WOMEN'S REFUGE IN NIMRUZ", 2004, "150", "15170", 0.04, "million_usd", "Afghanistan", "Austria", "Government and civil society", "Women's equality organisations and institutions", "Million USD" ], [ "625", "1", "STRATEGY FOR WOMEN'S PARTICIPATION IN POLITICS AND RECOSTRUCTION", 2003, "150", "15170", 0.08, "million_usd", "Afghanistan", "Austria", "Government and civil society", "Women's equality organisations and institutions", "Million USD" ], [ "625", "1", "CONTRIBUTION TO UNICEF'S  WOMEN'S RIGHTS  PROGRAMME", 2002, "150", "15170", 0.19, "million_usd", "Afghanistan", "Austria", "Government and civil society", "Women's equality organisations and institutions", "Million USD" ] ],
    "size" : 5
}