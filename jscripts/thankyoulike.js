var thankyoulike = {
	init: function()
	{
	},
	
	tgl: function(pid)
	{
		if(tylCollapsible == 1)
		{
			if($('#tyl_data_'+pid).is(':visible'))
			{
				$('#tyl_data_'+pid+',#tyl_title_'+pid).hide();
				$('#tyl_title_collapsed_'+pid).show();
				if($('#tyl_i_expcol_'+pid).attr('src'))
				{
					$('#tyl_i_expcol_'+pid).attr('src', $('#tyl_i_expcol_'+pid).attr('src').replace("collapse.png", "collapse_collapsed.png"));
				}
				$('#tyl_i_expcol_'+pid).attr('alt', "[+]");
				$('#tyl_a_expcol_'+pid).attr('title', "[+]");
			}
			else
			{
				$('#tyl_data_'+pid+',#tyl_title_'+pid).show();
				$('#tyl_title_collapsed_'+pid).hide();
				if($('#tyl_i_expcol_'+pid).attr('src'))
				{
					$('#tyl_i_expcol_'+pid).attr('src', $('#tyl_i_expcol_'+pid).attr('src').replace("collapse_collapsed.png", "collapse.png"));
				}
				$('#tyl_i_expcol_'+pid).attr('alt', "[-]");
				$('#tyl_a_expcol_'+pid).attr('title', "[-]");
			}
		}
	},
	
	add: function(pid)
	{
		if(use_xmlhttprequest == 1 && tylEnabled == 1)
		{
			if(tylUser == 0)
			{
				return true;
			}
			$.ajax('thankyoulike.php?ajax=1&action=add&pid='+pid+'&my_post_key='+my_post_key,
			{
				type: 'post',
				success: function (data)
				{
					thankyoulike.addDone(data, pid);	
				}
			});
			document.body.style.cursor = 'wait';
			return false;
		}
		else
		{
			return true;
		}
	},
	
	addDone: function(data, pid)
	{
		if(typeof data === 'string')
		{
			var result = $.parseJSON(data);
			if(result)
			{
				if(tylDisplayGrowl == 1)
				{
					$.jGrowl(result, {theme:'jgrowl_error'});
				}
				else
				{
					alert(result);
				}
			}
			document.body.style.cursor = 'default';
		}
		else
		{
			if (data.errors)
			{
				$.jGrowl(data.errors.join(' '), {theme:'jgrowl_error'});
			}
			else
			{
				if(tylDisplayGrowl == 1)
				{
					var msg = tylSend;
					var options = {theme:'jgrowl_success'};
					if (data.tylMsgNumLeft)
					{
						msg += "<br />\n<br />\n" + data.tylMsgNumLeft;
						if (data.tylMsgLife)
						{
							options.life = data.tylMsgLife;
						}
					}
					$.jGrowl(msg, options);
				}
				$("#tyl_"+pid).html(data.tylData);
				$("#tyl_"+pid).css('display', "");
				$("#tyl_btn_"+pid).before(data.tylButton).remove();
			}
		}
		document.body.style.cursor = 'default';
	},
	
	del: function(pid)
	{
		if(use_xmlhttprequest == 1 && tylEnabled == 1)
		{
			if(tylUser == 0)
			{
				return true;
			}
			$.ajax('thankyoulike.php?ajax=1&action=del&pid='+pid+'&my_post_key='+my_post_key,
			{
				type: 'post',
				success: function (data)
				{
					thankyoulike.delDone(data, pid);	
				}
			});
			document.body.style.cursor = 'wait';
			return false;
		}
		else
		{
			return true;
		}
	},
	
	delDone: function(data, pid)
	{
		if(typeof data === 'string')
		{
			var result = $.parseJSON(data);
			if(result){
				if(tylDisplayGrowl == 1)
				{
					$.jGrowl(result, {theme:'jgrowl_error'});
				}
				else
				{
					alert(result);
				}
			}
			document.body.style.cursor = 'default';
		}
		else
		{
			if (data.errors)
			{
				$.jGrowl(data.errors.join(' '), {theme:'jgrowl_error'});
			}
			else
			{
				if(tylDisplayGrowl == 1)
				{
					$.jGrowl(tylRemove, {theme:'jgrowl_success'});
				}
				$("#tyl_"+pid).html(data.tylData);
				$("#tyl_"+pid).css('display', "");
				$("#tyl_btn_"+pid).before(data.tylButton).remove();
			}
		}
		document.body.style.cursor = 'default';
	}
};	
$(document).ready(thankyoulike.init);
