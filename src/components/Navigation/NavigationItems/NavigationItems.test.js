import React from 'react';

import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()});

describe('<Navigation Items/>',function(){
    let wrapper;
    beforeEach(function(){
        wrapper = shallow(<NavigationItems/>);
    });

    it('Should render two navigation item elements if not authorized',function(){
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('Should render three navigation item elements if authorized',function(){
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('Should render three navigation with logout elements if authorized',function(){
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
}); 

