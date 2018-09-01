/*
 * Data Model Temple
 */
//用户
//学号，姓名，班级，院系，专业，总共学期，当前学期，专业人数，排名，每学期课程列表，查询时间，平均总绩点
function Student() {
    this.id = "";
    this.name = "";
    this.class = "";
    this.department = "";
    this.major = "";
    this.termTotal = 0;
    this.termNow = 1;
    this.number = 0;
    this.rank = 0;
    this.allCourses = [];
    this.time = null;
    this.pointTotalAverage = "";
}
//学期课程
//总绩点，总学分，平均绩点，课程列表
function Courses() {
    this.pointTotal = 0;
    this.creditTotal = 0;
    this.pointAverage = 0;
    this.courseList = [];

}
//课程
//名字，类型，学分，分数，绩点，是否挂科
function Course() {
    this.name = "";
    this.type = "必修课";
    this.credit = 0;
    this.score = 0;
    this.point = "---";
    this.fail = false;
}

//
function checkNum(a) {
    return isNaN(a) ? 0 : a;
}

/*
 * 计算部分
 */
//根据课程类型和分数，生成绩点
function countPoint(type, score) {
    var point = "---";
    if (type == "必修课" || type == "限选课") {
        if (score >= 90 && score <= 100 || score == "优秀") {
            point = 4.0;
            point = point.toFixed(1);
        } else if (score >= 86 && score <= 89)
            point = 3.7;
        else if ((score >= 80 && score <= 85) || score == "良好")
            point = 3.2;
        else if (score >= 75 && score <= 79)
            point = 2.7;
        else if (score >= 70 && score <= 74)
            point = 2.2;
        else if ((score >= 65 && score <= 69) || score == "中等")
            point = 1.7;
        else if ((score >= 60 && score <= 64) || score == "及格")
            point = 1.2;
        else if ((score >= 0 && score <= 59) || score == "不及格") {
            point = 0.0;
            point = point.toFixed(1);
        }
    }
    return point;
}

/*
 * 引导效果
 */
function guide() {
    var oMask = document.getElementById('mask');
    var oSearch = document.getElementById('searchTip');
    var aStep = oSearch.getElementsByTagName('div');
    var aA = oSearch.getElementsByTagName('a');
    var aClose = oSearch.getElementsByTagName('span');

    //从第一步开始显示
    oMask.style.display = oSearch.style.display = aStep[0].style.display = "block";

    for (var i = 0; i < aStep.length; i++) {
        aA[i].index = i; //为每一个按钮增加一个index属性，为后面引用做好准备
        aA[i].onclick = function() {
            this.parentNode.style.display = "none";
            //aStep[this.index+1].style.display="block";

            if (this.index < aStep.length - 1) { //如上，如果不加这个判断，到了最后一个会报错
                aStep[this.index + 1].style.display = "block";
            } else if (this.index == aStep.length - 1) { //如果到了最后一个，结束整个操作
                oMask.style.display = "none";
                this.style.display = oSearch.style.display = "none";
            }
        }
    }
    //关闭按钮
    for (var i = 0; i < aClose.length; i++) {
        aClose[i].onclick = function() {
            oMask.style.display = oSearch.style.display = this.parentNode.style.display = "none";
        }
    }
}

/*
 * 分享栏
 */
window._bd_share_config = {
    "common": {
        "bdSnsKey": {},
        "bdText": "",
        "bdMini": "2",
        "bdPic": "",
        "bdStyle": "0",
        "bdSize": "16"
    },
    "share": {}
};
with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
