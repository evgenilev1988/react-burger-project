import React from 'react';

import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()});



describe('<Navigation Items/>',function(){
    it('Should render two navigation item elements if not authorized',function(){
        const wrapper = shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
}); 