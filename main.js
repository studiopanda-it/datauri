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
	if("clipboard" in navigator) {
		navigator.clipboard.writeText($output.value);
	} else {
		$output.select();
		document.execCommand("copy");
	}
});

window.addEventListener("drop", function(e) {
	e.preventDefault();
	e.stopPropagation();
	if(e.dataTransfer.files.length === 1) {
		$file.files = e.dataTransfer.files;
		$file.dispatchEvent(new Event("change"));
	}
});

window.addEventListener("dragover", function(e) {
	e.preventDefault();
	e.stopPropagation();
});
