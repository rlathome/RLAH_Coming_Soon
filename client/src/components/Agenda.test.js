import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Agenda from './Agenda';
import { AdminData } from '../../json/fakedata';
const url = 'http://www.comingsoontour.com';
const mock = new MockAdapter(axios);

describe('Agenda Page', () => {
  beforeEach(()=>{
    mock.onGet(url + '')
  })
  it()
})
