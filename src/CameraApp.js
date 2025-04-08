import React, { useState, useRef, useEffect } from 'react';
import { Camera, useCameraDevices, useCameraPermission } from 'react-native-vision-camera';
import { View, Text, StyleSheet, Button } from 'react-native';

const CameraApp = () => {
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevices('back');
    const camera = useRef(null);
    const [error, setError] = useState(null);

    console.log('device,', device)
    useEffect(() => {
        // Yêu cầu quyền camera khi component được mount
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission, requestPermission]);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Lỗi camera: {error}</Text>
                <Button title="Thử lại" onPress={() => setError(null)} />
            </View>
        );
    }

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Không có quyền truy cập camera</Text>
                <Button title="Yêu cầu quyền" onPress={requestPermission} />
            </View>
        );
    }

    if (!device) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Không tìm thấy thiết bị camera</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
                fps={30}
                onError={(error) => {
                    console.log('Camera error:', error);
                    setError(error.message || 'Lỗi không xác định');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
    },
});

export default CameraApp;
