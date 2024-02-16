
const JPG2PNG = (()=>{
	function covertor(imgblob,options)
	{
		options = options || {};
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext("2d");
		const imageElement = createImage();
		const downloadLink = document.createElement("a");

		function createImage()
		{
			options = options || {};
			const img = document.createElement("img");
			img.style.width = options.width?`${options.width}px`:"auto";
			img.style.height = options.height?`${options.height}px`:"auto";

			return img;
		}
		function updatedownloadLink(jpgname,pngBlob)
		{
			const linkElement = downloadLink;
			const pngname = jpgname.replace(/jpe?g/i,"png");

			linkElement.setAttribute("download",pngname);
			linkElement.href = URL.createObjectURL(pngBlob);

			downloadLink.click();
		}
		function process()
		{
			const imgurl = URL.createObjectURL(imgblob);
			imageElement.addEventListener("load",e=>{
				canvas.width = e.target.width;
				canvas.height = e.target.height;
				ctx.drawImage(e.target,0,0,e.target.width,e.target.height);
				canvas.toBlob(
					updatedownloadLink.bind(window,imgblob.name),
					"image/png"
				)
			});
			imageElement.src = imgurl;
		}
		return{
			process:process
		}
	}
	return covertor
})();

const imgFileElem = document.querySelector("#file");

imgFileElem.addEventListener("change",(e)=>{
	const jpgblob = e.currentTarget.files[0];

	if(jpgblob.type.match(/image\/jpe?g/i)!==null)
	{
		JPG2PNG(jpgblob).process();
	}
	else
	{
		alert("Invalid JPG Formate!" + `Your File type is ${jpgblob.type}`);
	}
});