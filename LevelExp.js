/// <reference path="c:\Users\Administrator\Documents\aids/dts/LevelExp-master/"/> 
//插件版本
var ver = [1, 0, 0];
//插件作者
var newna = "MineFeng";
/**游戏tell开头 */
export const Gm_Tell = `§l§e[§d系统§e] §a`;
/**文件路径 */
export const _filePath = "./plugins/LevelExp/MainData/";
//插件注册
ll.registerPlugin(/*插件名字*/ "LevelExp", /*介绍*/ "等级系统API", /*版本*/ ver, /*信息*/ {} )
/**存储地址 */
export const sqlite = new DBSession("sqlite3", { path: _filePath + "XuidData.db", create: true, });
/**创建数据库 *//*ID=自动添加，xuid=玩家xuid，Name=玩家realName，Level=等级，Exp=经验，Time=注册时间*/
sqlite.execute(`CREATE TABLE IF NOT EXISTS "LevelEXP" (
		"ID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
		"Xuid" TEXT NOT NULL, 
		"Name" TEXT NOT NULL, 
		"Level" TEXT NOT NULL DEFAULT 1, 
		"Exp" INTEGER NOT NULL DEFAULT 0, 
		"Time" DATETIME DEFAULT CURRENT_TIMESTAMP, 
		CONSTRAINT "UNI_NAME" UNIQUE ("Xuid") ON CONFLICT ABORT, 
		CONSTRAINT "UNI_NAME" UNIQUE ("Name") ON CONFLICT ABORT);
	`);

//动态显示
setInterval(function () => {
		mc.getOnlinePlayers().forEach(pl => {
		pl.tell("§l   §f等级 :§a LV."+getLevel(pl.xuid)+" §f经验 : §f[ §e"+getExp(pl.xuid)+"§f/§d"+getNextLevelExp(getLevel(pl.xuid))+" §f]", 5) });
	},1000);//

/* 生物死亡 */
mc.listen('onMobDie', function(mob, source, cause) => {
		//检测是否为创造模式
		const pl = source.toPlayer();
		//防止出错
		if (!pl || pl.isCreative) return;
		//标准名列表
		switch (mob.type) {
			//添加经验//玩家
			case "minecraft:player": 
			addExp(pl.xuid, 50); 
			break;
			//添加经验//僵尸
			case "minecraft:zombie": 
			addExp(pl.xuid, 10); 
			break;
			//添加经验//骷髅
			case "minecraft:skeleton": 
			addExp(pl.xuid, 13); 
			break;
			//添加经验//苦力怕
			case "minecraft:creeper": 
			addExp(pl.xuid, 15); 
			break;
			//添加经验//蜘蛛
			case "minecraft:spider": 
			addExp(pl.xuid, 10); 
			break;
			//添加经验//末影人
			case "minecraft:enderman": 
			addExp(pl.xuid, 18); 
			break;
			//添加经验//女巫
			case "minecraft:witch": 
			addExp(pl.xuid, 15); 
			break;
			//添加经验//溺尸
			case "minecraft:drowned": 
			addExp(pl.xuid, 10); 
			break;
			//添加经验//幻翼
			case "minecraft:phantom": 
			addExp(pl.xuid, 15); 
			break;
			//添加经验//羊
			case "minecraft:sheep": 
			addExp(pl.xuid, 5); 
			break;
			//添加经验//猪
			case "minecraft:pig": 
			addExp(pl.xuid, 5); 
			break;
			//添加经验//牛
			case "minecraft:cow": 
			addExp(pl.xuid, 5); 
			break;
			//添加经验//末影龙
			case "minecraft:ender_dragon": 
			addExp(pl.xuid, 500); 
			break;

			/*//添加经验//自行添加
			case "写标准名": 
			addExp(pl.xuid, 写经验数量); 
			break;*/

			//添加经验//默认
			default: addExp(pl.xuid, 2); 
			/*消息*///pl.tell(Gm_Tell + "经验+3");
		}
	});

/* 玩家破坏方块完成 */
mc.listen("onDestroyBlock", function(pl, block) => { 
		//查询是否为模拟玩家
		if (pl.isSimulatedPlayer()) return;
		//检测是否为创造模式
		if (pl.isCreative) return;
		//获得方块标准名
		switch (block.type) {
			//添加经验//草方块
			case "minecraft:grass": 
			addExp(pl.xuid, 1); 
			break;
			//添加经验//泥巴
			case "minecraft:mud": 
			addExp(pl.xuid, 1); 
			break;
			//添加经验//石头
			case "minecraft:stone": 
			addExp(pl.xuid, 1); 
			break;
			//添加经验//沙子
			case "minecraft:sand": 
			addExp(pl.xuid, 3); 
			break;
			//添加经验//砂砾
			case "minecraft:gravel": 
			addExp(pl.xuid, 4); 
			break;
			//添加经验//灵魂土
			case "minecraft:soul_soil": 
			addExp(pl.xuid, 2); 
			break;
			//添加经验//粘土
			case "minecraft:clay_ball": 
			addExp(pl.xuid, 4); 
			break;
			//添加经验//荧石
			case "minecraft:glowstone": 
			addExp(pl.xuid, 5); 
			break;
			//添加经验//铁矿石
			case "minecraft:iron_ore": 
			addExp(pl.xuid, 20); 
			break;
			//添加经验//金矿石
			case "minecraft:gold_ore": 
			addExp(pl.xuid, 30); 
			break;
			//添加经验//钻石矿石
			case "minecraft:diamond_ore": 
			addExp(pl.xuid, 50); 
			break;
			//添加经验//青金石矿石
			case "minecraft:lapis_ore": 
			addExp(pl.xuid, 5); 
			break;
			//添加经验//红石矿石
			case "minecraft:redstone_ore": 
			addExp(pl.xuid, 10); 
			break;
			//添加经验//煤矿石
			case "minecraft:coal_ore": 
			addExp(pl.xuid, 5); 
			break;
			//添加经验//铜矿石
			case "minecraft:copper_ore": 
			addExp(pl.xuid, 5); 
			break;
			//添加经验//绿宝石矿石
			case "minecraft:emerald_ore": 
			addExp(pl.xuid, 15); 
			break;
			//添加经验//远古残骸
			case "minecraft:ancient_debris": 
			addExp(pl.xuid, 50); 
			break;

			/*//添加经验//自行添加
			case "这里写方块标准名": 
			addExp(pl.xuid, 这里写获得经验数量); 
			break;*/

			//默认奖励//为1点
			default: addExp(pl.xuid, 1);
			/*消息*///pl.tell(Gm_Tell + "经验+1");
		}
	});

/* 玩家放置方块后 */
mc.listen('afterPlaceBlock', (pl, block) => {
		//查询是否为模拟玩家
		if (pl.isSimulatedPlayer()) return;
		//检测是否为创造模式
		if (pl.isCreative) return;
		//添加经验//默认
		new addExp(pl.xuid, 1); 
		/*消息*///pl.tell(Gm_Tell + "经验+1");
	});

/* 玩家获得经验 */
mc.listen("onExperienceAdd", function(pl, exp) => {
		//查询是否为模拟玩家
		if (pl.isSimulatedPlayer()) return;
		//检测是否为创造模式
		if (pl.isCreative) return;
		//添加经验//经验值
		new addExp(pl.xuid, exp);
		/*消息*///pl.tell(Gm_Tell + "经验+" + exp);
	});

/* 监听进服事件 */
mc.listen('onJoin', function (pl) => {
		//查询是否为模拟玩家
		if (pl.isSimulatedPlayer()) return;
		//获取等级
		let level = getLevel(pl.xuid);
		setTimeout(() => {// 延时一下防止操作过快
		/*全体消息*/mc.getOnlinePlayers().forEach(ptt => {
		ptt.tell(Gm_Tell + "§a玩家 LV."+level+" §f"+pl.realName+" §a已进入本服!!", 4) });
		}, 400);
	});

/* 监听退出事件 */
mc.listen('onLeft', function (pl) => {
		//查询是否为模拟玩家
		if (pl.isSimulatedPlayer()) return;
		//获取等级
		let level = getLevel(pl.xuid);
		setTimeout(() => {// 延时一下防止操作过快
		/*全体消息*/mc.getOnlinePlayers().forEach(ptt => {
		ptt.tell(Gm_Tell + "§e玩家 §aLV."+level+" §f"+pl.realName+" §e已退出本服!!", 4) });
		}, 400);
	});

//进入服检测数据//进入前
mc.listen("onPreJoin", function (pl) {
		if (pl == null) return //玩家为空
		//查询是否为模拟玩家
		if (pl.isSimulatedPlayer()) return;
		//查询存在/*不存在建立数据*/
		if (!isTable(pl.xuid)) { new JoinCreate(pl.xuid); }
		/*else{	log("数据已经存在了");	}*/
	});

/**初始化数据库 */ 
mc.listen('onServerStarted', () => { 
		// 注册命令
		RegCommand();
		//配置文件已经存在
		if (!File.exists(_filePath)) {	/*还没写*/	}
		logger.info(`版本: ${ver} 作者: ${newna} !!![空]`);
	});

/** 保存玩家数据*/
export function JoinCreate(xuid) {
	try {
		//获取玩家对象
		let pl = mc.getPlayer(xuid);
		//玩家为空
		if (pl == null) return
		//检测是否存在
		if(!isTable(pl.xuid)) {
		//检测存在
		const stmt = sqlite.prepare("INSERT INTO LevelExp ('Xuid', 'Name') VALUES ($a, $b);");
		//执行数据库
		stmt.bind([xuid, pl.realName]).execute();
		logger.warn(`玩家 ${pl.realName} 的等级不存在，正在新建...`);
		return stmt.insertId || -1;
		}/*else{	log("数据已存在, 无需创建!");	}*/
		} catch (error) {
		//错误消息
		logger.log(error);
		return -1;
		}
	}

/** 等级升级信息
* @param xuid 玩家
* @return bool */
export function LevelUp(xuid) {
		//玩家为空
		if (xuid == null) return
		//等级上限检测
		if (getLevel(xuid) >= 200) return
		//获取等级
		let level = getLevel(xuid);
		/*等级加++*/
		let count = 1, lvl = Number(level) + Number(count);
		//加个等级
		if (addLevel(xuid, count));	/*等级+1*/
		//如:升一级获得奖励
		if (level % 1 == 0) {
		//奖励金币
		let count = 100; /*金币100*/
		money.add(xuid, count);
		}
		//如:升五级获得奖励
		if (level % 5 == 0) {
		//奖励
		let count = 100; /*金币100*/
		}
		//如:升十级获得奖励
		if (level % 10 == 0) {
		//奖励
		let count = 100; /*金币100*/
		}
		//如:升二十级获得奖励
		if (level % 20 == 0) {
		//奖励
		let count = 100; /*金币100*/
		}
		//如:升五十级获得奖励
		if (level % 50 == 0) {
		//奖励
		let count = 100; /*金币100*/
		}
		//如:升八十级获得奖励
		if (level % 80 == 0) {
		//奖励
		let count = 100; /*金币100*/
		}
		//如:升一百级获得奖励
		if (level % 100 == 0) {
		//奖励
		let count = 100; /*金币100*/
		}
		//如:升一百五级获得奖励
		if (level % 150 == 0) {
		//奖励
		let count = 100; /*金币100*/
		}
		//如:升一百八级获得奖励
		if (level % 180 == 0) {
		//奖励
		let count = 100; /*金币100*/
		}
		//如:升两百级获得奖励
		if (level % 200 == 0) {
		//奖励
		let count = 100; /*金币100*/
		}
		//获得玩家对象
		let pl = mc.getPlayer(xuid);
		//获得在线玩家
		let onlin = mc.getOnlinePlayers();
		//药水效果//生命提升
		mc.getPlayer(xuid).addEffect(10, 5*20, 3, Boolean(true).valueOf());
		//药水效果//伤害吸收
		mc.getPlayer(xuid).addEffect(22, 15*20, 2, Boolean(true).valueOf());
		//药水效果//力量
		mc.getPlayer(xuid).addEffect(5, 10*20, 1, Boolean(true).valueOf());
		/*主标题*/ 
		mc.getPlayer(xuid).setTitle("§l§d↑↑§fLevel UP§d↑↑");
		/*副标题*/
		mc.getPlayer(xuid).setTitle("§l§6LV."+level+" §e=> §aLV."+lvl+"", 3);
		/*聊天框显示*/
		mc.getPlayer(xuid).tell(Gm_Tell + "§a你已升级至: §6LV."+lvl+" §f<<");
		//声音//升级提示音
		mc.runcmdEx(`execute as ${pl.realName} run playsound random.levelup`);

		/*全体消息*/	onlin.forEach((ppt) => {
		ppt.tell(Gm_Tell + "§a恭喜玩家 §f"+pl.realName+" §a已升级至 §6LV."+lvl+" §a!!", "")
		});
	}

/** 添加玩家经验
* @param xuid 玩家
* @param exp 经验
* @return bool */
export function addExp(xuid, exp) {
		//玩家为空
		if (xuid == null) return
		//等级上限检测
		if (getLevel(xuid) >= 200) return
		//目前有的经验值
		let xp = getExp(xuid);
		//获得玩家对象
		let pl = mc.getPlayer(xuid);
		//获得经验显示
		if (mc.getPlayer(xuid).tell("§eEXP§c+§f"+exp, 4));
		//获得经验声音
		if (mc.runcmdEx(`execute as ${pl.realName} run playsound random.orb`));
		//是否可以升级
		if (xp + exp >= getNextLevelExp(getLevel(xuid))) {
		//计算//字符串，防止出错
		let pxp = Number(xp) + Number(exp) - Number(getNextLevelExp(getLevel(xuid)));
		/*升级*/
		if (LevelUp(xuid));	/*升级以及奖励*/
		//检测是否满级满就设置成0
		if (getLevel(xuid) >= 0 && getLevel(xuid) >= 200) {
		//约束等于0
		let mee = Number(1) - Number(1);
		//设置经验
		const stmt = sqlite.prepare("UPDATE LevelExp SET Exp = $a WHERE Xuid = $b;");
		//执行设置
		return stmt.bind([mee, xuid]).execute();
		//换一个角度
		}else{
		//添加经验并且升级
		const stmt = sqlite.prepare("UPDATE LevelExp SET Exp = $a WHERE Xuid = $b;");
		//执行数据//反过来
		return stmt.bind([pxp, xuid]).execute();
		}
		} else {
		//直接添加经验
		let tat = Number(xp) + Number(exp);
		//添加经验
		const stmt = sqlite.prepare("UPDATE LevelExp SET Exp = $a WHERE Xuid = $b;");
		//执行数据//反过来
		return stmt.bind([tat, xuid]).execute();
		}
	}

/** 查询玩家的经验数量
* @param xuid 玩家
* @return bool */
export function getExp(xuid){ //经验
	try {
		//玩家为空
		if (xuid == null) return
		const stmt = sqlite.prepare("SELECT Exp FROM LevelExp WHERE Xuid = $a;");
		//执行
		stmt.bind(xuid).execute();
		//查找
		let result = stmt.fetch();
		//检测存在
		if(result === false){
		//不存在设置为0
		return 0;
		}
		//显示
		return result["Exp"];
		//错误消息
		} catch (error) {
		//错误消息
		logger.log(error);
		return 0;
		}
	}

/** 查询玩家的等级
* @param xuid 玩家
* @return bool */
export function getLevel(xuid) { //等级
	try {
		//玩家为空
		if (xuid == null) return
		const stmt = sqlite.prepare("SELECT Level FROM LevelExp WHERE Xuid = $a;");
		//执行
		stmt.bind(xuid).execute();
		//查找
		let result = stmt.fetch();
		//检测存在
		if(result === false){
		//不存在设置为0
		return 0;
		}
		//显示
		return result["Level"];
		//错误信息
		} catch (error) {
		//错误消息
		logger.log(error);
		return 0;
		}
	}

/** 设置玩家等级
* @param xuid 玩家
* @param amount 数量
* @return bool */
export function setLevel(xuid, amount) { //设置等级
	try {
		//玩家为空
		if (xuid == null) return
		//没啥用
		let count = Number(amount); //getLevel(xuid);
		const stmt = sqlite.prepare("UPDATE LevelExp SET Level = $a WHERE Xuid = $b;");
		//执行设置等级
		return stmt.bind([count, xuid]).execute();
		} catch (error) {
		//错误消息
		logger.log(error);
		return false;
		}
	}

/** 添加玩家等级
* @param xuid 玩家
* @param amount 数量
* @return bool */
export function addLevel(xuid, amount) { //添加等级
	try {
		//玩家为空
		if (xuid == null) return
		//添加等级
		let count = Number(amount); //+ getLevel(xuid);
		const stmt = sqlite.prepare("UPDATE LevelExp SET Level = Level + $a WHERE Xuid = $b;");
		//执行添加等级
		return stmt.bind([count, xuid]).execute();
		} catch (error) {
		//错误消息
		logger.log(error);
		return false;
		}
	}

/** 减少玩家等级
* @param xuid 玩家
* @param amount 数量
* @return bool */
export function reduceLevel(xuid, amount) { //减少等级
	try {
		//玩家为空
		if (xuid == null) return
		//减少等级
		let count = Number(amount); //- getLevel(xuid);
		const stmt = sqlite.prepare("UPDATE LevelExp SET Level = Level - $a WHERE Xuid = $b;");
		//执行减少等级
		return stmt.bind([count, xuid]).execute();
		} catch (error) {
		//错误消息
		logger.log(error);
		return false;
		}
	}

/** 设置玩家经验
* @param xuid 玩家
* @param amount 经验
* @return bool */ /*这个好像没啥用啊😦没地方用*/
export function setExp(xuid, amount){ //设置经验
	try {
		//玩家为空
		if (xuid == null) return
		//没啥用
		let count = Number(amount); //getExp(xuid);
		const stmt = sqlite.prepare("UPDATE LevelExp SET Exp = $a WHERE Xuid = $b;");
		//执行设置经验
		return stmt.bind([count, xuid]).execute();
		} catch (error) {
		//错误消息
		logger.log(error);
		return false;
		}
	}

/** 添加玩家经验//不升级
* @param xuid 玩家
* @param amount 经验
* @return bool */ 
export function addsExp(xuid, amount){ //添加经验
	try {
		//玩家为空
		if (xuid == null) return
		//没啥用
		let count = Number(amount); //getExp(xuid);
		const stmt = sqlite.prepare("UPDATE LevelExp SET Exp = Exp + $a WHERE Xuid = $b;");
		//执行设置经验
		return stmt.bind([count, xuid]).execute();
		} catch (error) {
		//错误消息
		logger.log(error);
		return false;
		}
	}

/** 减少玩家经验
* @param xuid 玩家
* @param amount 经验
* @return bool */
export function reduceExp(xuid, amount){ //减少经验
	try {
		//玩家为空
		if (xuid == null) return
		//减少经验
		let count = Number(amount); //- getExp(xuid);
		const stmt = sqlite.prepare("UPDATE LevelExp SET Exp = Exp - $a WHERE Xuid = $b;");
		//执行减少经验
		return stmt.bind([count, xuid]).execute();
		} catch (error) {
		//错误消息
		logger.log(error);
		return false;
		}
	}

/* 判断指定玩家是否存在
* @param {String} xuid 玩家
* @return bool */
export function isTable(xuid) {
		//数据为空
		if (xuid == null) return
		//语句
		let result = sqlite.query("SELECT count(*) count FROM LevelExp WHERE Xuid = '" + xuid + "';");
		//结果=0 + 或者=1
		return result[1][0] > 0 ? true : false;
	}

/** 获得玩家等级上限
* @param level 等级
* @return bool */
export function getNextLevelExp(lvl) { //等级上限
		//数据为空
		if (lvl == null) return/**/
		//转换成数字
		let level = Number(lvl);
		// 转换数据
		if (level >= 0 && level <= 200) {
		//转换经验
		return level * 200;
		//别的数据
		}else{
		/*等级满了*/
		return 0;
		}
	}

////真命令注册
export function RegCommand() {
	try {
		const cmd = mc.newCommand("lvl", "LevelExp等级系统命令", PermType.GameMasters);

		//lvl reload
		cmd.setEnum('reload', ['reload']);
		cmd.mandatory('action', ParamType.Enum, 'reload', 1);
		cmd.overload(['reload']);

		//////////////////////////////////////////
		// 举例数
		cmd.mandatory("name", ParamType.Player);
		cmd.mandatory("count", ParamType.String);
		cmd.mandatory("exp", ParamType.Int);

		///////////////////////////////////////////
		//lvl addlevel <name: player> <level: string>
		cmd.setEnum('addlevel', ['addlevel']);
		cmd.mandatory('action', ParamType.Enum, 'addlevel', 1);
		cmd.overload(['addlevel', 'name', 'count']);

		//lvl dellevel <name: player> <level: string>
		cmd.setEnum('dellevel', ['dellevel']);
		cmd.mandatory('action', ParamType.Enum, 'dellevel', 1);
		cmd.overload(['dellevel', 'name', 'count']);

		//lvl setlevel <name: player> <level: string>
		cmd.setEnum('setlevel', ['setlevel']);
		cmd.mandatory('action', ParamType.Enum, 'setlevel', 1);
		cmd.overload(['setlevel', 'name', 'count']);

		///////////////////////////////////////////
		//lvl addexp <name: player> <exp: string>
		cmd.setEnum('addexp', ['addexp']);
		cmd.mandatory('action', ParamType.Enum, 'addexp', 1);
		cmd.overload(['addexp', 'name', 'count']);

		//lvl delexp <name: player> <exp: string>
		cmd.setEnum('delexp', ['delexp']);
		cmd.mandatory('action', ParamType.Enum, 'delexp', 1);
		cmd.overload(['delexp', 'name', 'count']);

		//lvl setexp <name: player> <exp: string>
		cmd.setEnum('setexp', ['setexp']);
		cmd.mandatory('action', ParamType.Enum, 'setexp', 1);
		cmd.overload(['setexp', 'name', 'count']);

		// 回调
		cmd.setCallback(CallBack);
		cmd.setup();
		} catch (e) {
		logger.error("注册命令失败！");
		logger.error("请检查命令是否被其他插件注册！");
		}
	}

//完整命令
export function CallBack(_, ori, out, res) {
		logger.debug(JSON.stringify(res));
		let plxuid, pl = ori.player;
		switch (res.action) {
		//重载配置
		case "reload":
			if (ori.type !== 7) return out.error('此命令仅限控制台执行');
			///因为还没有写配置文件所以没有
			//配置操作完成
			return out.success('---操作完成---');
		break;

		//添加等级
		case "addlevel":
			if (ori.type !== 7) return out.error('此命令仅限控制台执行');
			plxuid = data.name2xuid(res.name);
			if (plxuid == null || plxuid == "") {
				return out.error(`获取玩家 [${res.name}] 的XUID失败!`);
			}
			if (res.count == null || res.count == "") {
				return out.error(`请输入需要添加的等级[${res.count}]!!`);
			}
			//查询是否成功
			if (addLevel(plxuid, res.count)) {
				return out.success('---添加操作完成---');
			}else{
				return out.error("---操作失败---");
			}
		break;

		//减少等级
		case "dellevel":
			if (ori.type !== 7) return out.error('此命令仅限控制台执行');
			plxuid = data.name2xuid(res.name);
			if (plxuid == null || plxuid == "") {
				return out.error(`获取玩家 [${res.name}] 的XUID失败!`);
			}
			if (res.count == null || res.count == "") {
				return out.error(`请输入需要减少的等级[${res.count}]!!`);
			}
			//查询是否成功
			if (reduceLevel(plxuid, res.count)) {
				return out.success('---减少操作完成---');
			}else{
				return out.error("---操作失败---");
			}
		break;

		//设置等级
		case "setlevel":
			if (ori.type !== 7) return out.error('此命令仅限控制台执行');
			plxuid = data.name2xuid(res.name);
			if (plxuid == null || plxuid == "") {
				return out.error(`获取玩家 [${res.name}] 的XUID失败!`);
			}
			if (res.count == null || res.count == "") {
				return out.error(`请输入需要设置的等级[${res.count}]!!`);
			}
			//查询是否成功
			if (setLevel(plxuid, res.count)) {
				return out.success('---设置操作完成---');
			}else{
				return out.error("---操作失败---");
			}
		break;

		//添加经验
		case 'addexp':
			if (ori.type !== 7) return out.error("请在控制台上使用此命令");
			plxuid = data.name2xuid(res.name);
			if (plxuid == null || plxuid == "") {
				return out.error(`获取玩家 [${res.name}] 的XUID失败!`);
			}
			if (res.count == null || res.count == "") {
				return out.error(`请输入需要添加的经验[${res.count}]!!`);
			}
			//查询是否成功
			if (addsExp(plxuid, res.count)) {
				return out.success('---添加操作完成---');
			}else{
				return out.error("---操作失败---");
			}
		break;

		//减少经验
		case "delexp":
			if (ori.type !== 7) return out.error("请在控制台上使用此命令");
			plxuid = data.name2xuid(res.name);
			if (plxuid == null || plxuid == "") {
				return out.error(`获取玩家 [${res.name}] 的XUID失败!`);
			}
			if (res.count == null || res.count == "") {
				return out.error(`请输入需要减少的经验[${res.count}]!!`);
			}
			//查询是否成功
			if (reduceExp(plxuid, res.count)) {
				return out.success('---减少操作完成---');
			}else{
				return out.error("---操作失败---");
			}
			break;

		//设置经验
		case "setexp":
			if (ori.type !== 7) return out.error("请在控制台上使用此命令");
			plxuid = data.name2xuid(res.name);
			if (plxuid == null || plxuid == "") {
				return out.error(`获取玩家 [${res.name}] 的XUID失败!`);
			}
			if (res.count == null || res.count == "") {
				return out.error(`请输入需要设置的经验[${res.count}]!!`);
			}
			//查询是否成功
			if (setExp(plxuid, res.count)) {
				return out.success('---设置操作完成---');
			}else{
				return out.error("---操作失败---");
			}
			break;

			default: out.error("检测到你输入的命令不完整!");
		}
	}

//新版导出API

//获得需要升级的经验大小
ll.export((level) => {	return getNextLevelExp(level); /*获取经验*/	}, 'LevelExp', 'LevelExp_getNextLevelExp');

//获得等级或者经验数量
ll.export((xuid) => {	if (!isTable(xuid)) { return null; }	return getLevel(xuid); /*获取等级*/	}, 'LevelExp', 'LevelExp_getPlayerLevel');

ll.export((xuid) => {	if (!isTable(xuid)) { return null; }	return getExp(xuid); /*获取经验*/	},  'LevelExp', 'LevelExp_getPlayerExp');

//添加等级或者经验
ll.export((xuid, count) => {	if (!isTable(xuid)) { return null; }	return addLevel(xuid, count); /*添加等级*/	}, 'LevelExp', 'LevelExp_addPlayerLevel');

ll.export((xuid, count) => {	if (!isTable(xuid)) { return null; }	return addsExp(xuid, count); /*添加经验*/	}, 'LevelExp', 'LevelExp_addPlayerLevel');

//设置等级或者经验
ll.export((xuid, count) => {	if (!isTable(xuid)) { return null; }	return setLevel(xuid, count); /*设置等级*/	}, 'LevelExp', 'LevelExp_setPlayerLevel');

ll.export((xuid, count) => {	if (!isTable(xuid)) { return null; }	return setExp(xuid, count); /*设置经验*/	}, 'LevelExp', 'LevelExp_setPlayerExp');

//减少等级或者经验
ll.export((xuid, count) => {	if (!isTable(xuid)) { return null; }	return reduceLevel(xuid, count); /*减少经验*/	}, 'LevelExp', 'LevelExp_reducePlayerLevel');

ll.export((xuid, count) => {	if (!isTable(xuid)) { return null; }	return reduceExp(xuid, count); /*减少经验*/	}, 'LevelExp', 'LevelExp_reducePlayerExp');

/* 傻瓜式操作
ll.require('LevelExp.js');
let useLevel = ll.hasExported('LevelExp', 'LevelExp_getPlayerLevel');
let getLevel = lxl.import('LevelExp', 'LevelExp_getPlayerLevel');
getLevel(xuid);//获得等级
useLevel(xuid);//提供证明
*/

