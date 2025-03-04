package io.jpom.controller.system;

import cn.hutool.core.util.StrUtil;
import cn.jiangzeyin.common.JsonMessage;
import io.jpom.common.BaseServerController;
import io.jpom.common.interceptor.OptLog;
import io.jpom.model.data.MailAccountModel;
import io.jpom.model.data.UserModel;
import io.jpom.model.log.UserOperateLogV1;
import io.jpom.permission.SystemPermission;
import io.jpom.service.system.SystemMailConfigService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * 监控邮箱配置
 *
 * @author bwcx_jzy
 * @date 2019/7/16
 */
@Controller
@RequestMapping(value = "system")
public class SystemMailConfigController extends BaseServerController {

    @Resource
    private SystemMailConfigService systemMailConfigService;

    /**
     * 展示监控页面
     *
     * @return page
     */
    @RequestMapping(value = "mailConfig.html", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    @SystemPermission
    public String mailConfig() {
        UserModel userModel = getUser();
        if (userModel.isSystemUser()) {
            MailAccountModel item = systemMailConfigService.getConfig();
            setAttribute("item", item);
        }
        return "monitor/mailConfig";
    }

    /**
     * @author Hotstrip
     * load mail config data
     * 加载邮件配置
     * @return
     */
    @RequestMapping(value = "mail-config-data", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @SystemPermission
    @ResponseBody
    public String mailConfigData() {
        UserModel userModel = getUser();
        MailAccountModel item = null;
        if (userModel.isSystemUser()) {
            item = systemMailConfigService.getConfig();
        }
        return JsonMessage.getString(200, "success", item);
    }

    @RequestMapping(value = "mailConfig_save.json", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    @OptLog(UserOperateLogV1.OptType.EditMailConfig)
    @SystemPermission
    public String listData(MailAccountModel mailAccountModel) {
        if (mailAccountModel == null) {
            return JsonMessage.getString(405, "请填写信息");
        }
        if (StrUtil.isBlank(mailAccountModel.getHost())) {
            return JsonMessage.getString(405, "请填写host");
        }
        if (StrUtil.isBlank(mailAccountModel.getUser())) {
            return JsonMessage.getString(405, "请填写user");
        }
        if (StrUtil.isBlank(mailAccountModel.getPass())) {
            return JsonMessage.getString(405, "请填写pass");
        }
        if (StrUtil.isBlank(mailAccountModel.getFrom())) {
            return JsonMessage.getString(405, "请填写from");
        }
        systemMailConfigService.save(mailAccountModel);
        return JsonMessage.getString(200, "保存成功");
    }
}
