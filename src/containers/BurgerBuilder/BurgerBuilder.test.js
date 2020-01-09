import React from 'react';

import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter:new Adapter()});

describe('<BurgerBuilder/>',function(){
    let wrapper;
    beforeEach(function(){
        wrapper = shallow(<BurgerBuilder oninitIngredients={() => {}}/>);
    })

    it('Should render buildControls when recieving ingredients',function(){
        wrapper.setProps({ings: {salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})