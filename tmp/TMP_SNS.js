const SNS = `
    <div class="inner">
        <button type="button" class="btnClosePopup">닫기</button>
        <div class="content">
        <strong class="title">공유하기</strong>
        <ul class="shareList">
            <li>
            <a href="#" class="shareNateon" id="nateon">네이트온</a>
            </li>
            <li>
            <a href="#" class="shareFacebook" id="facebook">페이스북</a>
            </li>
            <li>
            <a href="#" class="shareTwetter" id="twitter">트위터</a>
            </li>
        </ul>
        <div class="shareInput">
            <input type="text" class="shareLinkUrl" readonly="readonly">
        </div>
        </div>
        <button type="button" class="btnCopyURL" onclick="ndrclick('TOS04'); utils.CopyUrlToClipboard('.shareLinkUrl')">URL 복사</button>
    </div>
    <div class="dimm"></div>
`;

export {
    SNS
}