export const config = {
    filters: [
        {
            "label": "District Wise Performance",
            "name": "Grade",
            "id": "grade",
            "labelProp": "grade",
            "valueProp": "grade",
            "query": "select grade from dimensions.grade"
        },
        {
            "label": "District Wise Performance",
            "name": "Subject",
            "id": "subject",
            "labelProp": "subject",
            "valueProp": "subject",
            "query": "select subject from dimensions.subject"
        },
        {
            "label": "District Wise Performance",
            "name": "Learning Outcome Code",
            "tableAlias": "t",
            "id": "lo_code",
            "labelProp": "lo_code",
            "valueProp": "lo_code",
            "query": "select lo_code from dimensions.lo"
        },
        {
            "label": "Grade & Subject Performance",
            "name": "Grade",
            "id": "grade",
            "labelProp": "grade",
            "valueProp": "grade",
            "query": "select grade from dimensions.grade"
        },
        {
            "label": "Grade & Subject Performance",      
            "name": "Subject",
            "id": "subject",
            "labelProp": "subject",
            "valueProp": "subject",
            "query": "select subject from dimensions.subject"
        },
      
        {
            "label": "State Wise Performance",
            "name": "Grade",
            "id": "grade",
            "labelProp": "grade",
            "valueProp": "grade",
            "query": "select grade from dimensions.grade"
        },
        {
            "label": "State Wise Performance",
            "name": "Subject",
            "id": "subject",
            "labelProp": "subject",
            "valueProp": "subject",
            "query": "select subject from dimensions.subject"
        },
        {
            "label": "State Wise Performance",
            "name": "Learning Outcome Code",
            "tableAlias": "t",
            "id": "lo_code",
            "labelProp": "lo_code",
            "valueProp": "lo_code",
            "query": "select lo_code from dimensions.lo"
        },

    ],
    nas_implementation_status: {
        "label": "Implementation Status",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions": {
                    "queries": {
                        "map": "select t.state_id,state_name ,t.status from dimensions.state as d join (select state_id , case when sum > 0 then 'YES' else 'NO' end as status from datasets.nas_started_state) as t on  d.state_id = t.state_id order by d.state_name asc"
                    },
                    "level": "state",
                    "nextLevel": "district"
                }
            }
        ],
        "options": {
            "map": {
                "metricFilterNeeded": false,
                "indicator": "status",
                "legend": {
                    "title": "Implemented NAs"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State/ UT Name :",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Implemented NAS : ",
                        "value": "status",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    },
    
    district_wise_performance:
    {
        "label": "District Wise Performance",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map":"select t3.district_id, district_name,latitude,longitude, lo_name , round(cast(sum(t.sum) as numeric ),2) as performance from datasets.nas_performance_district0lo0subject0grade as t join dimensions.lo as t2 on t.lo_code = t2.lo_code join dimensions.district as t3 on t.district_id = t3.district_id group by district_name,lo_name,t3.district_id,latitude,longitude"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                },
                {
                    "name": "State",
                    "hierarchyLevel": "1",
                    "actions":
                    {
                        "queries": {
                            "map": "select lo_name, round(cast(avg(sum) as numeric),2) as performance, t.district_id, district_name from datasets.nas_performance_district0lo0subject0grade as t join dimensions.district as d on t.district_id = d.district_id join dimensions.lo as l on t.lo_code = l.lo_code group by t.district_id, district_name, lo_name"
                        },
                        "level": "district",
                        "nextLevel": "block"
                    }
                }
            ],
        "options":
        {
            "map":
            {
                "indicator": "performance",
                "indicatorType": "percent",
                "legend": {
                    "title": "NAS Performance"
                },
                "tooltipMetrics":
                    [
                        {
                            "valuePrefix": "District Name: ",
                            "value": "district_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Learning Outcome: ",
                            "value": "lo_name",
                            "valueSuffix": "\n"
                        },
                        {
                            "valuePrefix": "Performance: ",
                            "value": "performance",
                            "valueSuffix": "%\n"
                        }
                    ]
            }
        }
    },

    grade_and_subject_performance: {
        "label": "Grade & Subject Performance",
        "filters": [
            {
                "name": "National",
                "hierarchyLevel": "0",
                "actions":
                {
                    "queries": {
                        "table": "select t.lo_code, lo_name, grade, subject, round(cast(sum(sum) as numeric),2) as performance, state_name as district_name from datasets.nas_performance_state0lo0subject0grade as t join dimensions.state as d on t.state_id = d.state_id join dimensions.lo as l on t.lo_code = l.lo_code group by t.state_id, state_name, subject, grade, lo_name, t.lo_code"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            },
            {
                "name": "State",
                "hierarchyLevel": "1",
                "actions":
                {
                    "queries": {
                        "table": "select t.lo_code, lo_name, grade, subject, round(cast(sum(sum) as numeric),2) as performance, district_name from datasets.nas_performance_district0lo0subject0grade as t join dimensions.district as d on t.district_id = d.district_id join dimensions.lo as l on t.lo_code = l.lo_code group by t.district_id, district_name, subject, grade, lo_name, t.lo_code"
                    },
                    "level": "district",
                    "nextLevel": "block"
                }
            }
        ],
        "options": {
            "table": {
                "groupByNeeded": true,
                "metricLabelProp": "district_name",
                "metricValueProp": "performance",
                "columns": [
                    {
                        name: "Learning Outcome Code",
                        property: "lo_code",
                        class: "text-center"
                    },
                    {
                        name: "Grade",
                        property: "grade",
                        class: "text-center"
                    },
                    {
                        name: "Subject",
                        property: "subject",
                        class: "text-center"
                    },
                    {
                        name: "District",
                        groupByNeeded: true,
                        property: "district_name",
                        class: "text-center",
                        isHeatMapRequired: true,
                        color: {
                            type: "percentage",
                            values: [
                                {
                                    color: "#1D4586",
                                    breakPoint: 75
                                },
                                {
                                    color: "#1156CC",
                                    breakPoint: 50
                                },
                                {
                                    color: "#6D9FEB",
                                    breakPoint: 0
                                }
                            ]
                        },
                    }
                ],
                "sortByProperty": "lo_code",
                "sortDirection": "asc"
            }
        }
    },

    nas_metrics: {
        "label": "District Wise Performance",
        "filters": [
            {
                "name": "State",
                "labelProp": "state_name",
                "valueProp": "state_id",
                "hierarchyLevel": "1",
                "actions": {
                    "queries": {
                        "bigNumber1": "select sum(sum) as total_schools from datasets.nas_no_of_schools_district",
                        "bigNumber2": "select sum(sum) as students_surveyed from datasets.nas_students_surveyed_district",
                        "bigNumber3": "select sum(sum) as total_teachers from datasets.nas_no_of_teachers_district",
                    },
                    "level": "district"
                }
            },
        ],
        "options": {
            "bigNumber": {
                "title": ['Total Schools', 'Total Students Surveyed', 'Total Teachers'],
                "valueSuffix": ['', '', ''],
                "property": ['total_schools', 'students_surveyed', 'total_teachers']
            }
        }
    },

    nas_state_wise_performance: {
        "label": "State Wise Performance",
        "filters":
            [
                {
                    "name": "National",
                    "hierarchyLevel": "0",
                    "actions":
                    {
                        "queries":
                        {
                            "map":"select t3.state_id, state_name, lo_name , round(cast(sum(t.sum) as numeric ),2) as percentage from datasets.nas_performance_state0lo0subject0grade as t join dimensions.lo as t2 on t.lo_code = t2.lo_code join dimensions.state as t3 on t.state_id = t3.state_id group by state_name,lo_name,t3.state_id"
                        },
                        "level": "state",
                        "nextLevel": "district"
                    }
                }
            ],
        "options":
        {
            "map":
            {
                "indicatorType": "percent",
                "metricLabelProp": "lo_name",
                "metricValueProp": "percentage",
                "groupByColumn": "state_id",
                "metricFilterNeeded": true,
                "legend": {
                    "title": "State Wise Performance"
                },
                "tooltipMetrics": [
                    {
                        "valuePrefix": "State Name: ",
                        "value": "state_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Learning Outcome :",
                        "value": "lo_name",
                        "valueSuffix": "\n"
                    },
                    {
                        "valuePrefix": "Performance",
                        "value": "percentage",
                        "valueSuffix": "\n"
                    }
                ]
            }
        }
    }
}