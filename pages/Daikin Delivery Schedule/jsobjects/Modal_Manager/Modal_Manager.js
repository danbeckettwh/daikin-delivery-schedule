export default {
	openModal: async (triggeredRow) => {
		// This function is still correct. Its only job is to prepare the state.
		await storeValue('daikinModalItem', triggeredRow);
	},

	// This is the corrected save function.
	saveChanges: async () => {
		try {
			// Use Promise.all to run both update queries simultaneously for best performance.
			await Promise.all([
				update_schedule_entry.run(),
				update_labels_done_status.run()
			]);

			// These actions will only run if BOTH queries succeed.
			closeModal('edit_modal');
			showAlert('Details saved successfully!', 'success');

		} catch (error) {
			// This will run if EITHER of the queries fails.
			console.error("Failed to save Daikin schedule changes:", error);
			showAlert('Error: Could not save changes. Please check the details.', 'error');

		} finally {
			// This will always run, whether the save succeeded or failed.
			// It ensures the table is always refreshed with the latest data from the database.
			await get_schedule.run();
		}
	}
}