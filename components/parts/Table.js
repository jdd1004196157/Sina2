/**
 * Created by chaijiang on 2017/3/31.
 */

import React, {Component} from 'react'
import { Row, Col } from 'antd';


export default class Table extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount(){

    }

    render() {

        const styles = {
            root: {
                width: '100%',
                height: 'auto',
                margin: 0,
                padding: 0,
                textAlign: 'center',
            },
            col:{
                borderLeft: '1px solid grey',
                borderTop: '1px solid grey',
                height: '30px',
                lineHeight: '30px'
            },
            row1: {
                height: '30px',
                borderRight: '1px solid grey'
            },

        }
        //表格中数据
        const tableData = this.props.data


        const tab = tableData.map(obj => {
            return(
                <Row style={styles.row1} >
                    <Col span={6} style={styles.col}>当前平均耗时</Col>
                    <Col span={6} style={styles.col}>{obj.net}</Col>
                    <Col span={6} style={styles.col}>{obj.MAPI}</Col>
                    <Col span={6} style={styles.col}>{obj.platform}</Col>
                </Row>
            )
        });

        return (
            <div style={styles.root}>
                <Row style={styles.row1}>
                    <Col span={6} style={styles.col}></Col>
                    <Col span={6} style={styles.col}>网络</Col>
                    <Col span={6} style={styles.col}>MAPI</Col>
                    <Col span={6} style={styles.col}>平台</Col>
                </Row>
                {tab}
                <Row style={{borderBottom: '1px solid grey'}}></Row>
            </div>
        )
    }
}