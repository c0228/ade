import React from "react";
import { UrlParams, Icon } from "e-ui-react";

const url = UrlParams().baseUrl;

export const HeaderMenu = ()=> [{ id:'Home', url: url+'App/Home', label:'Home' },
{ id:'Menu', url:url+'App/Menu', label:'Menu' },
{ id:'Authentication', url:url+'App/Authentication', label:'SignUp / Login' }];