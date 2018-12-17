// ==UserScript==
// @name         Happychat Transcript Optimizer
// @namespace    https://github.com/senff/Chat-transcripts
// @version      1.0
// @description  Makes links clickable, stylizes chat bubbles and removes English-to-English i8n
// @author       Senff
// @require      https://code.jquery.com/jquery-1.12.4.js
// @match        https://mc.a8c.com/support-stats/happychat/*
// @updateURL    https://raw.githubusercontent.com/senff/Chat-transcripts/master/tampermonkey.js
// @grant        none
// ==/UserScript==

var $ = window.jQuery;

function url2links() {
    $('#transcript .hapdash-chat-bubble div p').each(function(){
        var str = $(this).html();
        // var regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
        var regex = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        // Replace plain text links by hyperlinks
        var replaced_text = str.replace(regex, "<a href='$1' target='_blank'>$1</a>");
        $(this).html(replaced_text);
    });
}

function removeEnglishTranslation() {
    $('.chat-message-annotation-separator').each(function(){
        var msgBefore = $(this).parent().find('p:nth-of-type(1)').html();
        var msgAfter = $(this).parent().find('p:nth-of-type(2)').html();
        if(msgBefore==msgAfter) {
            $(this).parent().find('p:nth-of-type(1)').remove();
            $(this).remove();
        }
    });
}

$(document).ready(function() {
   url2links();
   removeEnglishTranslation()
});
