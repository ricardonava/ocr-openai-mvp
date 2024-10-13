import React from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetailPage = () => {
  const { id } = useParams();
  return <div>Employee ID: {id}</div>;
};

export default EmployeeDetailPage;
