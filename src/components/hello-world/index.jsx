import React from 'react';
import PropTypes from 'prop-types';
import style from './hello-world.css';
import { Button } from 'reactstrap';

const HelloWorld = ({ title }) => (
  <div className={style['hello-world']}>
            {title}
        <Button color="danger">i am reactstrap!</Button>


  </div>
);

HelloWorld.propTypes = {
  title: PropTypes.string,
};

export default HelloWorld;
