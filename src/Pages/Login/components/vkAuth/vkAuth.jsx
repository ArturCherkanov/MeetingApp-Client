import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { vkAuth } from '../../../../api/index';

function vaAuth({ location }) {

    useEffect(() => {
        let myHeaders = new Headers({ 'Access-Control-Allow-Origin': 'http://localhost:3000/vk' });
        let myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        let values = queryString.parse(location.search);
        fetch('https://oauth.vk.com/access_token?client_id=6995323&client_secret=HotEz0wXby8a0sEqY8Yl&redirect_uri=http://localhost:3000/vk/&code=' + values.code, myInit)
            .then(res => console.log(res))
    });
    return (<div></div>);
}
vaAuth.propTypes = {
};

export default vaAuth;