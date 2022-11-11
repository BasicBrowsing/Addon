
import { byId , div , img } from '../../STL/DOM/Document.js'
import { hashFrom } from '../../STL/Visual/StringColor.js'
import parseAgent from '../../STL/Visual/UserAgent.js'


const 
    { getURL } = browser.runtime ,
    { log } = console ;


const useragent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36';
// const useragent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0';

const agentTag = byId('UserAgent');


const { type , version , system , ... details } = 
    parseAgent(useragent);


const browserTag = div();
browserTag.title = 'Browser Version';
browserTag.style.backgroundColor = await hashFrom(version);
browserTag.appendChild(logo(type));
browserTag.appendChild(text(version));

agentTag.appendChild(browserTag);
agentTag.appendChild(await makeSystemTag(system));

if(details.appleWebKit)
    agentTag.appendChild(await makeWekKitTag(details.appleWebKit));
    

async function makeWekKitTag ( version ){
    
    const tag = div();
    tag.title = 'Apple Webkit Version';
    tag.style.backgroundColor = await hashFrom(version);
    tag.appendChild(logo('Apple'));
    tag.appendChild(text(version));
    
    return tag;
}


async function makeSystemTag ( system ){
    
    const { type , version } = system;
    
    const tag = div();
    tag.title = 'Operating System Version';
    tag.style.backgroundColor = await hashFrom(version);
    tag.appendChild(logo(type));
    
    if(version)
        tag.appendChild(text(version));
    
    return tag;
}


function text ( content ){
    const tag = div();
    tag.innerText = content;
    return tag;
}

function logo ( type ){
    const tag = img();
    tag.src = logoURL(type);
    return tag;
}

function logoURL ( type ){
    return getURL(`Assets/Icons/Logos/${ type }.svg`);
}
