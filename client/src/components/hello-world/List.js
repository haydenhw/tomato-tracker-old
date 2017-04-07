import React from 'react';

export default function List(props) {
  const dataList = props.data.map((item, index) => {
    return <li key={index}>{item.testData}</li>
  });
  return <ul>{dataList}</ul>
}