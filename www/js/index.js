/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

document.addEventListener('deviceready', setupOpenwith, false);

function setupOpenwith() {

    // Increase verbosity if you need more logs
    //cordova.openwith.setVerbosity(cordova.openwith.DEBUG);

    // Initialize the plugin
    cordova.openwith.init(initSuccess, initError);

    function initSuccess()  { console.log('init success!'); }
    function initError(err) { console.log('init failed: ' + err); }

    // Define your file handler
    cordova.openwith.addHandler(myHandler);

    function myHandler(intent) {
        window.lastShareIntent = intent;

        console.log('intent received');
        console.log('  text: ' + intent.text); // description to the sharing, for instance title of the page when shared URL from Safari
        for (var i = 0; i < intent.items.length; ++i) {
            var item = intent.items[i];
            console.log('  type: ', item.uti);    // UTI. possible values: public.url, public.text or public.image
            console.log('  type: ', item.type);   // Mime type. For example: "image/jpeg"
            console.log('  data: ', item.data);   // shared data. For URLs and text - actually the shared URL or text. For image - its base64 string representation.
            console.log('  text: ', item.text);   // text to share alongside the item. as we don't allow user to enter text in native UI, in most cases this will be empty. However for sharing pages from Safari this might contain the title of the shared page.
            console.log('  name: ', item.name);   // suggested name of the image. For instance: "IMG_0404.JPG"
            console.log('  utis: ', item.utis);   // some optional additional info
        }

        document.getElementById('deviceready').innerHTML = `<pre>${JSON.stringify({items: intent.items}, null, 2)}</pre>`;
    }
}
