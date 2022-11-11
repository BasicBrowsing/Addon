
'use strict';

const 
    { onBeforeSendHeaders } = browser.webRequest ,
    { clear , log } = console ;

clear();



const useragent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36';




(async () => {
    log('Theme',await browser.theme.getCurrent());
    log(window.matchMedia('(prefers-color-scheme: dark)'))
})();


// const Sidebar = browser.runtime.getURL('Sidebar.html');
// 
// browser.commands.onCommand.addListener(async (command) => {
// 
//     await browser.sidebarAction.toggle();
//     await browser.sidebarAction.setPanel({ panel : Sidebar });
// 
// })


const { tabs } = browser;


function enforceAgent ( request ){

    const { requestHeaders } = request;
    
    for( const header of requestHeaders )
        if(isUserAgent(header))
            header.value = useragent;
    
    return { requestHeaders }
}

function isUserAgent ( header ){
    return header.name.toLowerCase() === 'user-agent';
}


const 
    permissions = [ 'blocking' , 'requestHeaders' ] ,
    everywhere = { urls : [ '<all_urls>' ] } ;

onBeforeSendHeaders
    .addListener(enforceAgent,everywhere,permissions);


async function updateUseragents (){
    
    log('Updating Useragents');
}


async function onUpdate ({ reason }){
    
    
    if([ 'install' , 'update' ].includes(reason))
        updateUseragents();
        
    if(reason === 'install'){
        
        const hasPermission = await browser.permissions.contains({
            origins : [ '<all_urls>' ]
        })
        
        if(!hasPermission)
            openWelcomePage();
    }
}


async function openWelcomePage (){
    
    let createData = {
        allowScriptsToClose : true ,
        focused : true ,
        height : 400 ,
        width : 600 ,
        type : 'detached_panel' ,
        url : 'Welcome.html'
    }
    
    const window = await browser.windows.create(createData);

}


browser.runtime.onInstalled.addListener(onUpdate);
