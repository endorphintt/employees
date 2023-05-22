import React from "react";
import { Layout as AntLayout } from 'antd'
import s from './layout.module.scss'
import { Header } from "../header/header";

type Props = {
    children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className={s.main}>
            <Header/>
            <AntLayout.Content style={{ height: '100%'}}>
                {children}
            </AntLayout.Content>
        </div>
    )
}