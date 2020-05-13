import React from 'react';

export default function ItemLI(propriedades){

  // desestruturacao para recuperar a propriedade title e children  na criacao do componente
  const {title,children} = propriedades;

  return (
    <li>
      {title}
      {children}
    </li>
  );
}