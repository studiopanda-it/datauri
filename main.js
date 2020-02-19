const $file = document.querySelector(".file"),
	$output = document.querySelector(".output"),
	$copy = document.querySelector(".copy");
$file.addEventListener("change", function() {
	$copy.disabled = true;
	if(this.files[0]) {
		const fileReader = new FileReader();
		fileReader.addEventListener("load", function(e) {
			$output.value = e.target.result;
			$copy.disabled = false;
		});
		fileReader.readAsDataURL(this.files[0]);
	} else {
		$output.value = "";
	}
});
$copy.addEventListener("click", function() {
	navigator.clipboard.writeText($output.value);
});

window.addEventListener("drop", function(e) {
	e.preventDefault();
	e.stopPropagation();
	if(e.dataTransfer.files.length === 1) {
		$file.files = e.dataTransfer.files;
		const event = new Event("change");
		$file.dispatchEvent(event);
	}
});

window.addEventListener("dragover", function(e) {
	e.preventDefault();
	e.stopPropagation();
});
