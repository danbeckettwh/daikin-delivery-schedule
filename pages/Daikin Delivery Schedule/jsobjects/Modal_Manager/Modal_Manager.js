export default {
	openModal: async (triggeredRow) => {
		// This function's ONLY job is to prepare the state.
		// It implicitly returns a Promise that resolves when storeValue is complete.
		await storeValue('daikinModalItem', triggeredRow);
	},

	saveChanges: async () => {
		// The saveChanges function remains the same.
		await update_schedule_entry.run();
		closeModal('edit_modal');
		await get_schedule.run();
		showAlert('Details saved successfully!', 'success');
	}
}