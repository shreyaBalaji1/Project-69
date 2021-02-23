import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: "",
            buttonState: "normal"
        }
    }
    getCameraPermissons = async(id) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: id,
            scanned: false
        })
    }
    handleBarcodeScanned = async({data}) => {
        const {buttonState} = this.state.buttonState;
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: "normal"
        });
    }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState !== "normal" && hasCameraPermissions) {
            return(
                <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarcodeScanned}
                style = {StyleSheet.absoluteFillObject}/>
            );
        }
        else if(buttonState === "normal") {
            return(
                <View style = {styles.container}>
                    <View style = {styles.container}>
                        <Image
                        source = {require("../assets/BarcodeScanner.jpg")}
                        style = {{width: 200, height: 200}}/>
                    </View>
                    <TouchableOpacity
                    style = {styles.scanButton}
                    onPress = {this.getCameraPermissons}
                    title = "Bar Code Scanner">
                        <Text style = {styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    scanButton: {
        margin: 10,
        padding: 10,
        backgroundColor: "#2196f3"
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    buttonText: {
        fontSize: 20
    }
});