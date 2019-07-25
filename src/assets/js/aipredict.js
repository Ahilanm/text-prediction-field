/*Prediction Jquery */
var tempTabFlag = 0;
var xhr;
var switchFlag = 1;
var substringStart;
var predictCount = 0;
// Function to listion keyup in text area
$(document).on('keyup','#textareaDiv', function(e) {
    var code = (e.keyCode || e.which);

    // restrict ajax call on below specified keys (arrow/enter)
    if(code == 37 || code == 38 || code == 39 || code == 40 || code == 13 || code == 32) {
        if(code == 13){
            xhr.abort();
        }
        return;
    }
    $("#textareaDiv .textarea_case_span").remove();
    var sampleText = $('#textareaDiv').text();
    substringStart = $('#textareaDiv').text().length;
    if(substringStart != getCaretPosition()){
        return;
    }
    if( substringStart < 4 ) return;
    var temp_a = $('#textareaDiv').text();
    var a = $('#textareaDiv').text();
    if(a.length > 4){
        a = a.substr(a.length - 4);
    }
    if(switchFlag == 1){
        var temp_case_url = "https://tensorflow.qatouch.com/c_predict";
        if(xhr && xhr.readyState != 4){
            xhr.abort();
        }
        /**
         *  Ajax call to prediction python flask model
         *   @params key data for prediction
         *   @return JSONified prediction value
         */
        xhr = $.ajax({
            type: 'POST',
            url: temp_case_url,
            dataType: "json",
            timeout:5000,
            data: JSON.stringify({
                'data':a
            }),
            xhrField: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: "application/json;",
            success: function( data ) {
                var space_find = data.result[0].substring(0,1);
                if(space_find == ' '){
                    return;
                }
                $("#textareaDiv .textarea_case_span").remove();
                var data_word;
                var lastChar = a[a.length -1];
                if (lastChar == lastChar.toUpperCase()) {
                    data_word = data.result[0].toUpperCase();
                }
                if (lastChar == lastChar.toLowerCase()){
                    data_word = data.result[0].toLowerCase();
                }
                if(tempTabFlag == 0){
                    if(data_word != 'undefined'){
                        if($("#textareaDiv br").length == 0){
                            $("#textareaDiv").append("<span class='textarea_case_span' contentEditable='false'style='opacity:  0.5;'>"+data_word+"<span class='textarea_case_span_tab' contentEditable='false'style='opacity: 0.5;border-radius: 4px;color: white;background-color: black;margin-left: 5px;padding: 3px 3px 3px 3px;'>tab?</span></span>");
                            tempTabFlag = 1;
                        }else{
                            $("#textareaDiv br").insertBefore("<span class='textarea_case_span' contentEditable='false'style='opacity:  0.5;'>"+data_word+"<span class='textarea_case_span_tab' contentEditable='false'style='opacity: 0.5;border-radius: 4px;color: white;background-color: black;margin-left: 5px;padding: 3px 3px 3px 3px;'>tab?</span></span>");
                            tempTabFlag = 1;
                        }
                    }
                }else{
                    if(data_word != 'undefined'){
                        if($("#textareaDiv br").length == 0){
                            $("#textareaDiv").append("<span class='textarea_case_span' contentEditable='false'style='opacity:  0.5;'>"+data_word+"</span>");
                        }else{
                            $("<span class='textarea_case_span' contentEditable='false'style='opacity:  0.5;'>"+data_word+"</span>").insertBefore("#textareaDiv br");
                        }
                    }
                }
            },
            error: function(e){
                if(e.statusText == 'timeout')
                {
                    switchFlag = 0;
                }
            },
        });
    }
});
$(document).on('keydown', '#textareaDiv', function(e) {
    if(substringStart != getCaretPosition()){
        return;
    }
    var keyCode = e.keyCode || e.which;

    if ((keyCode == 9 || keyCode == 39) && tempTabFlag==1) {
        e.preventDefault();
        $("#textareaDiv .textarea_case_span_tab").remove();
        var sampleText_1 = $("#textareaDiv").text();
        $("#textareaDiv").text($.trim(sampleText_1));
        var len_temp = $("#textareaDiv").text().length;
        var el = document.getElementById('textarea_case');
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el.childNodes[0], len_temp);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        el.focus();
        $("#textareaDiv").focus();
        $("#textareaDiv .textarea_case_span").remove();
    }else{
        $("#textareaDiv .textarea_case_span").remove();
    }
});
$(document).mouseup(function(e){
    var container = $('#textareaDiv');
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        $("#textareaDiv .textarea_case_span").remove();
    }
});
/* Function to place cursor at end of sentence after tab */
function getCaretPosition() {
    if (window.getSelection && window.getSelection().getRangeAt) {
        var range = window.getSelection().getRangeAt(0);
        var selectedObj = window.getSelection();
        var rangeCount = 0;
        var childNodes = selectedObj.anchorNode.parentNode.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i] == selectedObj.anchorNode) {
                break;
            }
            if (childNodes[i].outerHTML)
                rangeCount += childNodes[i].outerHTML.length;
            else if (childNodes[i].nodeType == 3) {
                rangeCount += childNodes[i].textContent.length;
            }
        }
        return range.startOffset + rangeCount;
    }
    return -1;
}