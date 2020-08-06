
//成为向导页面： 提交时的非空验证
function xd_check() {
    //如果职业不是学生，则不讨论学校是否必填、
    if ($("#profession_type option:selected").val() != 1) {
        $("#uschool").removeClass("cell-input");
    } else {
        $("#uschool").addClass("cell-input");
    }
    //普通字段 校验
    $(".cell-input").each(function () {

        //不是
        var val = $(this).val(); //当前元素值
        var _label = $(this).attr('data_label'); //当前待填字段

        if (val == '' || $.trim(val) == '') {
            if ($(this).attr('id') == 'up_customid' || $(this).attr('id') == 'momo') {

            } else {
                //提示必填
                dialog.alert(_label + '必填！');

                //check为false
                check = false;

                //返回
                return false;
            }
        } else if ($(this).attr("id") == 'uIDcard') { //非空时验证一下 身份证
            //获取身份证编号
            var _id = $(this).val();
            //console.log(_id);
            valid_IDcard(_id);
        }


    })
    //下拉选择字段 校验
    //省市区
    var Pro_adcode = $("#province option:selected").attr('adcode');
    var city_adcode = $("#city option:selected").attr('adcode');
    var country_adcode = $("#country option:selected").attr('adcode');
    if (!Pro_adcode || !city_adcode || !country_adcode) {
        //提示必填
        dialog.alert('请完整填写常居住地');
        check = false;
        return false;
    }
}

//成为向导页面： 提交 事件
function toBe_wizard() {
    // 验证
    var check = true;
    xd_check();
    if (check) {
        // alert('111');
        //禁用
        $(this).attr('disabled', true);
        //省 名称 和 编码 
        var pro_val = $("#province option:selected").val();
        var Pro_adcode = $("#province option:selected").attr('adcode');

        //市 名称 和 编码 
        var city_val = $("#city option:selected").val();
        var city_adcode = $("#city option:selected").attr('adcode');

        //区 名称 和 编码 
        var country_val = $("#country option:selected").val();
        var country_adcode = $("#country option:selected").attr('adcode');

        //职业证照片 url
        var profession_photo_url = '';
        var guide = 0;
        var _profession_type = $("#profession_type option:selected").val();
        if (_profession_type == 1) {
            profession_photo_url = studentCard_Arr[0];
            guide = 0;
        } else if (_profession_type == 3) {
            profession_photo_url = studentCard_Arr[0];

            //是否是导游
            guide = 1;
        } else {
            profession_photo_url = '';
            guide = 0;
        }



        var data = {


            up_customid: $("#up_customid").val(),
            address: $("#uaddress").val(),
            // 区
            area: country_val,
            area_code: country_adcode,

            birthday: $("#dateinput").val(),
            // 市
            city: city_val,
            city_code: city_adcode,

            guide: 0,
            identity_no: $("#uIDcard").val(),
            //目前是身份证
            identity_type: 1,
            name: $("#uname").val(),
            phone: $("#tele_number").val(),
            profession_type: $("#profession_type option:selected").val(),
            // 省
            province: pro_val,
            province_code: Pro_adcode,

            sex: $("#usex input[type=radio]:checked").val(),
            tall: $("#tall").val(),
            traveler_earn_month: getDate_YYYYMM(),
            traveler_native: $("#national option:selected").val(),
            // traveler_photo_url: '1111',
            webchat: $("#uwechat").val(),
            weight: $("#weight").val(),
            momo: $("#momo").val(),
            // 身份证 url
            idcard_back_url: ID_imgUrlArr[0],
            idcard_front_url: ID_imgUrlArr[1],
            //是否是导游
            profession_photo_url: profession_photo_url,
            guide: guide

        };
        //console.log(JSON.stringify(data));
        $.ajax({
            headers: {
                token: header_token
            },
            contentType: 'application/json',
            type: 'POST',
            url: commonURL + '/api/travelerInfo/addTravelerInfo',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                if(data.code == '0000'){
                    $(this).attr('disabled', false);
                }
                
            }
        })
    }

}

//获取当前 年月  YYYYMM
function getDate_YYYYMM() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" + month : month);
    var mydate = (year.toString() + month.toString());
    return mydate;
}



window.onload = function(){
    var elements = document.getElementsByTagName("input");
    $(elements).attr('autocomplete','off');
}


