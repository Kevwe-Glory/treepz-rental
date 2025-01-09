import { MouseEventHandler } from 'react';

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface CarProps {
  _id: string;
  image?: string;
  make: string;
  passengerCapacity: number;
  garageLocation?: string;
}

export interface APIResponse<T = any> {
  status: string;
  data: T;
  message: string;
  statusCode: number;
}