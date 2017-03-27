import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
  require('./style.scss');
}

export const type = {
  large: 'large',
  medium: 'medium',
  small: 'small'
};

function headingClasses (type = type.large, addlClasses = []) {
  const headingClasses = ['title--' + type].concat( addlClasses );

  return headingClasses.join(' ');
}

function heading(type, addlClasses, children) {
  const classGroup = headingClasses( type, addlClasses );

  switch (type) {
    case type.small:
      return <h3 className={ classGroup }>{ children }</h3>;
    case type.medium:
      return <h2 className={ classGroup }>{ children }</h2>;
    case type.large:
    default:
      return <h1 className={ classGroup }>{ children }</h1>;
  }
}

function Title (props) {
  return (
    <div className='title'>
      { heading(props.type, props.addlClasses, props.children) }
    </div>
  );
}

Title.propTypes = {
  addlClasses: PropTypes.array,
  children: PropTypes.object.isRequired,
  type: PropTypes.oneOf([type.large, type.medium, type.small])
};

export default Title;
