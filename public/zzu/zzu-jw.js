//保留小数点后1位
function toDecimal(x) {
       var f = parseFloat(x);  
       if (isNaN(f)) {  
           return false;  
       }  
       var f = Math.round(x*10)/10;  
       var s = f.toString();  
       var rs = s.indexOf('.');  
       if (rs < 0) {  
           rs = s.length;  
           s += '.';  
       }  
       while (s.length <= rs + 1) {  
           s += '0';  
       }  
       return s;  
   }

//取数字
function toFloat(a){
	var c=0;
	if(a!=null&&a!="")
		if(!isNaN(a))
			c=parseFloat(a);
	return c;
}

//增加模板行
function addRow(){
	var table = document.getElementById("addTable");
	var tr = document.getElementById("clone");
	var newTR = tr.cloneNode(true);
	newTR.style.display="";
	newTR.className="clone_tr";
	var footTBody = document.getElementById("footTbody");
	return table.insertBefore(newTR,footTBody);
}
 
//删除模板行
function deleteRow(obj) {
	var tr = obj.parentNode.parentNode;
	var table = document.getElementById("addTable"); 
	table.removeChild(tr);
}

//根据课程类别和成绩，生成绩点
function jidian_shengcheng(leibie,chengji){
	var jidian = "--";
	if(leibie=="必修课"||leibie=="限选课"){
		if(chengji>=90&&chengji<=100)
			jidian = "4.0";
		else if(chengji>=86&&chengji<=89)
			jidian = "3.7";
		else if(chengji>=80&&chengji<=85)
			jidian = "3.2";
		else if(chengji>=75&&chengji<=79)
			jidian = "2.7";
		else if(chengji>=70&&chengji<=74)
			jidian = "2.2";
		else if(chengji>=65&&chengji<=69)
			jidian = "1.7";
		else if(chengji>=60&&chengji<=64)
			jidian = "1.2";
		else if(chengji>=0&&chengji<=59)
			jidian = "0.0";
        else if(chengji=="优秀")
			jidian = "4.0";
        else if(chengji=="良好")
			jidian = "3.2";
        else if(chengji=="中等")
			jidian = "1.7"; 
        else if(chengji=="及格")
			jidian = "1.2";   
        else if(chengji=="不及格")
			jidian = "0.0";     
	}else	jidian = "--";
	return jidian;	
}

/**
 *引导效果
**/
function guide(){
    var oMask=document.getElementById('mask');
    var oSearch=document.getElementById('searchTip');	
    var aStep=oSearch.getElementsByTagName('div');
    var aA=oSearch.getElementsByTagName('a');
    var aClose=oSearch.getElementsByTagName('span');
    
    //从第一步开始显示
    oMask.style.display=oSearch.style.display=aStep[0].style.display="block";
    
    for( var i=0; i<aStep.length; i++){
        aA[i].index=i;//为每一个按钮增加一个index属性，为后面引用做好准备
        aA[i].onclick=function(){
            this.parentNode.style.display="none";
            //aStep[this.index+1].style.display="block";
				
            if(this.index<aStep.length-1){//如上，如果不加这个判断，到了最后一个会报错
                aStep[this.index+1].style.display="block";
            }
            else if(this.index==aStep.length-1){//如果到了最后一个，结束整个操作
                oMask.style.display="none";
                this.style.display=oSearch.style.display="none";
            }
        }
    }
	
    //关闭按钮
    for(var i=0; i<aClose.length;i++){
        aClose[i].onclick=function(){
            oMask.style.display=oSearch.style.display=this.parentNode.style.display="none";
        }
    }
}		



/**
 *Js对cookie操作
**/

//删除cookie
function delCookie(name){
    document.cookie = name+"=;expires="+(new Date(0)).toGMTString(); 
}
  
//获取指定名称的cookie的值  
function getCookie(objName){
    var arrStr = document.cookie.split("; "); 
    for(var i = 0;i < arrStr.length;i ++){ 
        var temp = arrStr[i].split("="); 
        if(temp[0] == objName) 
            return unescape(temp[1]); 
    } 
    return '';
} 
  
//添加cookie  
function addCookie(objName,objValue,objYears){      
    var str = objName + "=" + escape(objValue); 
    if(objYears > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date(); 
        var ms = objYears*3600*1000*24*365; 
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString(); 
   } 
   document.cookie = str;
}

//获取url里的GET值
function getPar(par){
    //获取当前URL
    var local_url = document.location.href; 
    //获取要取得的get参数位置
    var get = local_url.indexOf(par +"=");
    if(get == -1){
        return false;   
    }   
    //截取字符串
    var get_par = local_url.slice(par.length + get + 1);    
    //判断截取后的字符串是否还有其他get参数
    //var nextPar = get_par.indexOf("&");
    //if(nextPar != -1){
    //    get_par = get_par.slice(0, nextPar);
    //}
    return get_par;
}

//输入框验证
function check(obj){
	var td = obj.nextSibling;
	var t = /^\d+(\.\d+)?$/
	if(t.test(obj.value)){
		td.innerHTML=""; 
	}
	else
		td.innerHTML="填数字哦"; 
}

//按照指定格式输出日期
function formatDate(format){  
    var date = new Date();
    var formatstr = format;  
    if(format != null && format != ""){  
        //设置年  
        if(formatstr.indexOf("yyyy") >=0 ){  
            formatstr = formatstr.replace("yyyy",date.getFullYear());  
        }  
        //设置月  
        if(formatstr.indexOf("MM") >=0 ){  
            var month = date.getMonth() + 1;  
            formatstr = formatstr.replace("MM",month);  
        }  
        //设置日  
        if(formatstr.indexOf("dd") >=0 ){  
            var day = date.getDate();
            formatstr = formatstr.replace("dd",day);  
        }  
        //设置时 - 24小时  
        var hours = date.getHours();  
        if(formatstr.indexOf("HH") >=0 ){  
            if(month < 10){  
                month = "0" + month;  
            }  
            formatstr = formatstr.replace("HH",hours);  
        }  
        //设置时 - 12小时  
        if(formatstr.indexOf("hh") >=0 ){  
            if(hours > 12){  
                hours = hours - 12;  
            }  
            if(hours < 10){  
                hours = "0" + hours;  
            }  
            formatstr = formatstr.replace("hh",hours);  
        }  
        //设置分  
        if(formatstr.indexOf("mm") >=0 ){  
            var minute = date.getMinutes();  
            if(minute < 10){  
                minute = "0" + minute;  
            }  
            formatstr = formatstr.replace("mm",minute);  
        }  
        //设置秒  
        if(formatstr.indexOf("ss") >=0 ){  
            var second = date.getSeconds();  
            if(second < 10){  
                second = "0" + second;  
            }  
            formatstr = formatstr.replace("ss",second);  
        }  
    }  
    return formatstr;  
}