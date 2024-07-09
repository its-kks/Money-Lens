import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import appColors from '../../../constants/colors';

const ConfirmationModal = ({ visible, onConfirm, onCancel, text, setVisible, enableOk = false }) => {
	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="slide"
			style={{ justifyContent: 'center', alignItems: 'center' }}
		>

			<Pressable style={styles.centeredView} onPress={() => { setVisible(false) }}>
				<Pressable style={styles.modalView} onPress={() => { }}>
					<Text style={styles.modalText}>{text}</Text>
					<View style={styles.buttonContainer}>
						{enableOk ?
							<>
								<TouchableOpacity onPress={onCancel} style={[styles.button, styles.buttonCancel]}>
									<Text style={[styles.textStyle, { color: appColors.red }]}>Close</Text>
								</TouchableOpacity>
							</> :
							<>
								<TouchableOpacity onPress={onConfirm} style={[styles.button, styles.buttonConfirm]}>
									<Text style={styles.textStyle}>Yes</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={onCancel} style={[styles.button, styles.buttonCancel]}>
									<Text style={[styles.textStyle, { color: appColors.red }]}>No</Text>
								</TouchableOpacity>
							</>
						}
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: appColors.lightGrey + '50'
	},
	modalView: {
		margin: 20,
		backgroundColor: appColors.white,
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: appColors.grey,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 15,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginHorizontal: 10,
	},
	buttonConfirm: {
		backgroundColor: appColors.green,
		width: 80
	},
	buttonCancel: {
		backgroundColor: appColors.white,
		width: 80,
		borderWidth: 2,
		borderColor: appColors.red

	},
	textStyle: {
		color: appColors.white,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		color: appColors.black,
		fontSize: 18
	},
});

export default ConfirmationModal;