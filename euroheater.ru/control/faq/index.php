<?php 
# ������ ������� ��� ������ � ���������-�������� (������� faq)
# romanov.egor@gmail.com; 2015.6.3

# ���������� ���� �������
include('../loader.control.php');

# ���������� ����� ������� ��� index.php � ajax.php
include('common.functions.php');

# ���������
$GLOBALS['tpl_title'] = '�������-������';
$GLOBALS['imagesPath'] = '/public/images/faq/';

# ������
if ($_GET['itemID']) $_GET['itemID'] = (int)$_GET['itemID'];

# ������
if ($_GET['action'] == "addItem")
{ 
    $GLOBALS['tpl_title'] .= ' > ��������� ������-�����';
    $GLOBALS['tpl_h1'] = '��������� ������-�����'; 
    $GLOBALS['tpl_content'] = showAddForm();
}
elseif ($_GET['action'] == "addItemSubmit") {
    $GLOBALS['tpl_title'] .= ' > ��������� ������-�����';
    $GLOBALS['tpl_h1'] = '��������� ������-�����'; 
    $GLOBALS['tpl_content'] = addItemSubmit(); 
}
elseif ($_GET['action'] == "editItem") {
    $GLOBALS['tpl_title'] .= ' > ����������� ������-�����';
    $GLOBALS['tpl_h1'] = '����������� ������-�����'; 
    $GLOBALS['tpl_content'] = showEditForm(); 
}
elseif ($_GET['action'] == "deleteItem") {
    $GLOBALS['tpl_title'] .= ' > ������� ������-�����';
    $GLOBALS['tpl_h1'] = '������� ������-�����'; 
    $GLOBALS['tpl_content'] = deleteItem(); 
}
else { 
    $GLOBALS['tpl_title'] .= ' > ��� �������-������';
    $GLOBALS['tpl_h1'] = '��� �������-������ ('.$dbh->query('select count(1) from '.DB_PREFIX.'faq')->fetchColumn().')'; 
    $GLOBALS['tpl_content'] = showItems(); 
}
# /������

# ������� ������� ������
$tpl->setMainTemplate('template_for_all_pages.php');
$tpl->echoMainTemplate();

# ����������

# ��������� ������ ���� ��������-�������
function showItems($count = null)
{
    global $dbh;
    
    # �������� ������ ��������-�������
    $sql = '
    select id,
           name,
           url,
           is_showable
    from '.DB_PREFIX.'faq
    order by name
    '; # echo '<pre>'.$sql."</pre><hr />";
    $sql_for_count = '
    select count(id)
    from '.DB_PREFIX.'faq
    '; # echo '<pre>'.$sql_for_count."</pre><hr />";
	$pages = new pages($_GET["page"], # ������� ��������
					   25, # ������� �� ��������
					   $dbh, # ������ ���� ������
                       '', # routeVars
					   $sql, # sql-������
					   $sql_for_count, # sql-������ ��� �������� ���������� �������
					   '/control/faq/', # ����� �� 1� ��������
					   '/control/faq/?page=%page%', # ����� �� ��������� ��������
						1500 # ������������ ���������� ������� �� ��������
						);
	$_result = $pages->getResult(); # echo '<pre>'.(print_r($_result, true)).'</pre>'; exit;
    $_ = $_result['resultSet'];
    if (!empty($_result['pagesSet'])) $pagesList = '<div class="pages_set">��������: '.$_result['pagesSet'].'</div>';
    $_c = count($_);
	$rows = array();
    for ($i=0;$i<$_c;$i++)
	{
        # ������
        $link = '<a href="/vopros/'.$_[$i]['url'].'/" target="_blank">��������</a>';
        
        # is_showable
        if (empty($_[$i]['is_showable'])) $trClass = ' class="item_hidden"';
        else unset($trClass);
        
        $rows[] = '
		<tr'.$trClass.'>
            <td class="center vertical_middle">
                <a class="block" href="/control/faq/?action=editItem&itemID='.$_[$i]['id'].'">
                    <i class="fa fa-edit size_18"></i>
                </a>
            </td>
			<td class="center vertical_middle">'.$link.'</td>
			<td>'.$_[$i]['name'].'</td>
			<td class="center vertical_middle">
                <a class="block" title="������� ������-�����" href="/control/faq/?action=deleteItem&itemID='.$_[$i]['id'].'" onClick="return confirm(\'������-����� ����� ������ ������������. ������� ������-�����?\')">
                    <i class="fa fa-trash-o size_18"></i>
                </a>
			</td>
		</tr>
		';
    }
	
	if (!empty($rows) and is_array($rows)) $rows = implode("\n", $rows);
	else unset($rows);
    
    $result = '
	<script type="text/javascript" src="/control/faq/index.js"></script>
	
    <div style="width:50%;float:left">
        <b>URL:</b>&nbsp; <a href="/vopros/" target="_blank">http://'.$_SERVER['SERVER_NAME'].'/vopros/</a>
    </div>
    <div style="width:50%;float:right;text-align:right;padding-right:15px">
        ����� �� ��������: &nbsp;
        <input id="search" class="form-control form_required" type="text" value="" style="display:inline-block;width:150px" />
    </div>
    <br style="clear:both" />
    
    <div class="center" style="margin-bottom:15px">
        <a href="/control/faq/?action=addItem">
            <button id="parse_all_projects" class="btn btn-success" type="button">
                <i class="fa fa-plus-square" style="margin-right:3px"></i>
                    �������� ������-�����
            </button>
        </a>
    </div>
    ';
    
    if (empty($rows)) $result .= '� ������� �� ����� �� ���� ������-�����.';
    else
    {
        $result .= '
        <div id="resultSet">
        <table border="1" cellpadding="2" class="table table-striped table-bordered table-hover projects_list">
            <tr>
                <th class="center vertical_middle" style="width:50px;white-space:nowrap">������</th>
                <th class="center vertical_middle" style="width:50px;white-space:nowrap">������</th>
                <th class="center vertical_middle">��������</th>
                <th class="center vertical_middle" style="width:100px;white-space:nowrap">��������</th>
            </tr>
            '.$rows.'
        </table>
        '.$pagesList.'
        </div>';
    }
    
    return $result;
} # / ��������� ������ ���� ��������-�������

# ����� �������������� �������-������
function showEditForm()
{
    global $dbh;
    
    $showEditForm = 1;

    # ������� ���������
    if ($_GET['success'] == 1) $GLOBALS['tpl_success'] = '������-����� ������� ��������.';
    
    # ��������� ��������� � ��
    if ($_GET['subaction'] == 'submit' && !empty($_POST))
    {
        $sql = '
        update '.DB_PREFIX.'faq
        set name = :name,
            url = :url,
            title = :title,
            navigation = :navigation,
            full_navigation = :full_navigation,
            h1 = :h1,
            footeranchor = :footeranchor,
            is_showable = :is_showable
        where id = :id
        '; # echo '<pre>'.$sql."</pre><hr />";
        $sth = $dbh->prepare($sql);
        $sth->bindParam(':name', $_POST['faq_form_name']);
        $sth->bindParam(':url', $_POST['faq_form_url']);
        $sth->bindParam(':title', $_POST['faq_form_title']);
        $sth->bindParam(':navigation', $_POST['faq_form_navigation']);
        # full_navigation
        if (empty($_POST['faq_form_full_navigation'])) $_POST['faq_form_full_navigation'] = null;
        $sth->bindParam(':full_navigation', $_POST['faq_form_full_navigation']);
        $sth->bindParam(':h1', $_POST['faq_form_h1']);
        # is_showable
        $isShowable = !empty($_POST['faq_form_is_showable']) ? 1 : NULL;
        $sth->bindParam(':is_showable', $isShowable, PDO::PARAM_INT);
        # footeranchor
        if ($_POST['faq_form_footeranchor'] == '') $_POST['faq_form_footeranchor'] = null;
        $sth->bindParam(':footeranchor', $_POST['faq_form_footeranchor']);
        # id
        $sth->bindParam(':id', $_GET['itemID'], PDO::PARAM_INT);
        if ($sth->execute())
        {
            $GLOBALS['tpl_success'] = '���������� ���������.';
            
			# ��������� ����� � ����
			saveContentToFile($_GET['itemID'],
							  $_POST['faq_form_text']);
        }
        else
        {
            $GLOBALS['tpl_failure'] = '� ���������, ���������� �� ���������. ���, ���������� � ������������� �����.';
            if (!empty($GLOBALS['error'])) $GLOBALS['tpl_failure'] .= '<hr class="slim">'.$GLOBALS['error'];
            return showAddForm();
        }
    }

    # ������� ����� ��������������
    if ($showEditForm)
	{
		# �������� ������ �� �������
		$itemInfo = getItemInfo($_GET['itemID']); # echo '<pre>'.(print_r($itemInfo, true)).'</pre>';
        
        # ������
        if (!$itemInfo['id']) exit('
		�� ���������� ������ � ID='.$_GET['itemID'].'
		<br /><a href="/control/faq/">������� � ������ ��������-�������</a>
		');
        
		# ������ ����� ������-������ �� �����
        if (!empty($itemInfo['file_name']))
        {
            $fullPathToFile = $_SERVER['DOCUMENT_ROOT'].'/app/site_sections_faq/'.basename($itemInfo['file_name']); # echo $fullPathToFile.'<hr />';
            if (file_exists($fullPathToFile))
            {
                $content = file_get_contents($fullPathToFile); # echo $content.'<hr />';
                # prepare for showing
                $content = htmlspecialchars($content, ENT_QUOTES);
                $content = str_replace("\t", "", $content);
            }
        }

        # prepare all values for showing
        # foreach ($itemInfo as $k => $v) $itemInfo[$k] = htmlspecialchars($v, ENT_QUOTES);
        
        return "
		<script type='text/javascript' src='/control/faq/index.js'></script>
		<form id='faq_form' action='/control/faq/?action=editItem&itemID=".$itemInfo['id']."&subaction=submit' name='faq_form' method='post' enctype='multipart/form-data' onSubmit=\"return SendForm('form1')\" id='editItemForm' style='font-size:14px;position:relative'>
            
            <button class='btn btn-primary submit_button' type='submit'>��������� ����������</button>

            &nbsp;&nbsp;&nbsp; <a href='/control/faq/'><button class='btn btn-success' type='button'>
            <i class='fa fa-share-square' style='margin-right:3px'></i>
            ������� � ������
            </button></a>
            
            &nbsp;&nbsp;&nbsp; <a href='/control/faq/?action=addItem'><button class='btn btn-success' type='button'>
            <i class='fa fa-plus-square' style='margin-right:3px'></i>
            �������� ������-�����
            </button></a>
            
            &nbsp;&nbsp;&nbsp; <a href='/control/faq/?action=deleteItem&itemID=".$itemInfo['id']."' onClick='return confirm(\"������-����� ����� ������� ������������. ������� ������-�����?\");'><button class='btn btn-danger' type='button'><i class='fa fa-trash-o' style='margin-right:3px'></i> ������� ������-�����</button></a>

			<br><br><b>URL:</b>&nbsp; <a href='/vopros/".$itemInfo['url']."/' target='_blank'>http://".$_SERVER['SERVER_NAME']."/vopros/".$itemInfo['url']."/</a>
            
            <br><br>
            <div class='form-group' style='width:60%'>
                <label>���������� (��-���������): <span style='color:red'>*</span></label>
                <input type='text' name='faq_form_url' id='faq_form_url' class='form-control form_required' data-required-label='���, ������� ���������� (��������: kak-oplatit-zakaz)' value='".$itemInfo['url']."' />
            </div>

            <div class='form-group' style='width:60%'>
                <label>�������� (������): <span style='color:red'>*</span></label>
                <input type='text' name='faq_form_name' id='faq_form_name' class='form-control form_required' data-required-label='���, ������� �������� (������) ��-������' value='".$itemInfo['name']."' />
            </div>
            
            <div class='form-group' style='width:90%'>
                <label>��������� ��������:</label>
                <input type='text' name='faq_form_title' id='faq_form_title' class='form-control' data-required-label='���, ������� ��������� ��������' value='".$itemInfo['title']."' />
            </div>
            
            <div class='form-group' style='width:90%'>
                <label>������ ���������:</label>
                <input type='text' name='faq_form_navigation' id='faq_form_navigation' class='form-control' value='".$itemInfo['navigation']."' />
            </div>
            
			<div class='form-group' style='width:95%'>
                <label>������ ��������� � ������ ������:
                       <br />
                       <span style='font-weight:normal'>* ���� �������, �� ����� ��������� ������ ��������� �� ����� ����:</span>
                </label>
                <textarea name='faq_form_full_navigation' id='faq_form_full_navigation' class='form-control' style='width:95%;height:100px'>".$itemInfo['full_navigation']."</textarea>
            </div>

            <div class='form-group' style='width:90%'>
                <label>��������� h1:</label>
                <input type='text' name='faq_form_h1' id='faq_form_h1' class='form-control' value='".$itemInfo['h1']."' />
            </div>

            <div class='form-group'>
                <label>�����:</label>
                <textarea name='faq_form_text' id='faq_form_text' class='form-control lined' style='width:90%;height:270px'>".$content."</textarea>
            </div>
            
            <div class='form-group' style='width:95%'>
                <label>����� ��� ������������ � �������:</label> &nbsp; 
                <textarea name='faq_form_footeranchor' id='faq_form_footeranchor' class='form-control' style='width:95%;height:55px'>".$itemInfo['footeranchor']."</textarea>
            </div>
            
            <div class='form-group' style='margin-bottom:0'>
                <label>
                    <input type='checkbox' name='faq_form_is_showable' id='faq_form_is_showable' class='form_checkbox' ".(!empty($itemInfo['is_showable']) ? 'checked="checekd"' : '')." />&nbsp; ���������� ������-����� �� �����
                </label>
            </div>
            
            <br />
			<button class='btn btn-primary submit_button' type='submit' style='margin-top:5px'>��������� ����������</button>
            
		</form>
		";
    }
} # /����� �������������� �������-������

# ����� ���������� �������-������
function showAddForm()
{
    global $dbh;
    
    return "
	<script type='text/javascript' src='/control/faq/index.js'></script>
	<form id='faq_form' action='/control/faq/?action=addItemSubmit' name='form1' method='post' enctype='multipart/form-data' id='addItemForm' style='font-size:14px;position:relative'>
        <button class='btn btn-primary submit_button' type='submit'>�������� ������-�����</button>
        
        &nbsp;&nbsp;&nbsp; <a href='/control/faq/'><button class='btn btn-success' type='button'>
        <i class='fa fa-share-square' style='margin-right:3px'></i>
        ������� � ������
        </button></a>
        
		<br /><br /><b>URL:</b>&nbsp; <a href='/vopros/' target='_blank'>http://".$_SERVER['SERVER_NAME']."/vopros/</a>

        <br /><br />
        <div class='form-group' style='width:60%'>
            <label>���������� (��-���������): <span style='color:red'>*</span></label>
            <input type='text' name='faq_form_url' id='faq_form_url' class='form-control form_required' data-required-label='���, ������� ���������� (��������: kak-oplatit-zakaz)' value='".$_POST['url']."' />
        </div>

        <div class='form-group' style='width:60%'>
            <label>�������� (������): <span style='color:red'>*</span></label>
            <input type='text' name='faq_form_name' id='faq_form_name' class='form-control form_required' data-required-label='���, ������� �������� (������) ��-������' value='".$_POST['name']."' />
        </div>

        <div id='faq_form_name_alert_div' class='alert alert-info hidden width_95'></div>

        <div class='form-group' style='width:90%'>
            <label>��������� ��������:</label>
            <input type='text' name='faq_form_title' id='faq_form_title' class='form-control' data-required-label='���, ������� ��������� ��������' value='".$_POST['title']."' />
        </div>

        <div class='form-group' style='width:90%'>
            <label>������ ���������:</label>
            <input type='text' name='faq_form_navigation' id='faq_form_navigation' class='form-control' value='".$_POST['navigation']."' />
        </div>
        
        <div class='form-group' style='width:95%'>
            <label>������ ��������� � ������ ������:
                   <br />
                   <span style='font-weight:normal'>* ���� �������, �� ����� ��������� ������ ��������� �� ����� ����:</span>
            </label>
            <textarea name='faq_form_full_navigation' id='faq_form_full_navigation' class='form-control' style='width:95%;height:100px'>".$_POST['faq_form_full_navigation']."</textarea>
        </div>

        <div class='form-group' style='width:90%'>
            <label>��������� h1:</label>
            <input type='text' name='faq_form_h1' id='faq_form_h1' class='form-control' value='".$_POST['h1']."' />
        </div>

        <div class='form-group'>
            <label>�����:</label>
            <textarea name='faq_form_text' id='faq_form_text' class='form-control lined' style='width:90%;height:270px'></textarea>
        </div>
        
        <div class='form-group' style='width:95%'>
            <label>����� ��� ������������ � �������:</label> &nbsp;
            <textarea name='faq_form_footeranchor' id='faq_form_footeranchor' class='form-control' style='width:95%;height:55px'>".$_POST['faq_form_footeranchor']."</textarea>
        </div>
        
        <div class='form-group' style='margin-bottom:0'>
            <label>
                <input type='checkbox' name='faq_form_is_showable' id='faq_form_is_showable' class='form_checkbox' checked='checekd' />&nbsp; ���������� ������-����� �� �����
            </label>
        </div>
        
        <br />
        
        <button class='btn btn-primary submit_button' type='submit'>�������� ������-�����</button>
	</form>
	";
} # /����� ���������� �������

# ��������� ������-����� � ��
function addItemSubmit()
{
	global $dbh, $html;
	
	# print_r($_POST);
	# ������ �� ������� ������� URL'�: /control/faq/?action=addItemSubmit
	if (!empty($_POST))
	{
        # �������� + ������ ��������� POST-����������
        preparePOSTVariables(); # print_r($_POST); exit;

		# ��������� ������-����� � ��
		$lastInsertID = addItemToDB(); # echo $lastInsertID.'<hr />';
		# ���� ������-����� ������� ��������
		if (!empty($lastInsertID))
		{
			# ��������� ����� � ����
			saveContentToFile($lastInsertID,
							  $_POST['faq_form_text']);
            
			# ������ ��������������� �� ����� ��������������
			$fullUrlForEdit = 'http://'.$_SERVER['SERVER_NAME']."/control/faq/?action=editItem&itemID=".$lastInsertID.'&success=1';  # echo $fullUrlForEdit.'<hr />';
			header('Location: '.$fullUrlForEdit);
		}
		# ���� �������� ������ � ������-����� �� ��������
		else
		{
            $GLOBALS['tpl_failure'] = '� ���������, �������� ������ � ������-����� �� ��������. ����������, ���������� � ������������� �����.';
            if (!empty($GLOBALS['error'])) $GLOBALS['tpl_failure'] .= '<hr class="slim">'.$GLOBALS['error'];
            return showAddForm();
		}
	}
	# ���� ������: /control/faq/addItemSubmit/ � ��� ���� $_POST ������
	else
	{
		# ������� ������ ��������-�������
        $GLOBALS['tpl_failure'] = '� ���������, �������� ������ � ������-����� �� ��������. ����������, ���������� � ������������� �����.';
        if (!empty($GLOBALS['error'])) $GLOBALS['tpl_failure'] .= '<hr>'.$GLOBALS['error'];
        return showAddForm();
	}
} # /��������� ������-����� � ��

# ������� ������-�����
function deleteItem(){
	
	global $dbh;
	
	# �������� ����������
	if (empty($_GET['itemID']))
	{
		# ������� ������
		$GLOBALS['tpl_failure'] = '������-����� �� ������. ����������, ���������� � ������������� �����.';
        if (!empty($GLOBALS['error'])) $GLOBALS['tpl_failure'] .= '<hr>'.$GLOBALS['error'];
		# ������� ������ ��������-�������
        showItems();
	}
	else
	{
		# �������� ������ �� �������
		$itemInfo = getItemInfo($_GET['itemID']); # echo '<pre>'.(print_r($itemInfo, true)).'</pre>';

		# ������� ������-����� �� ��
        $sql = '
        delete from '.DB_PREFIX.'faq
        where id = :id
        '; # echo '<pre>'.$sql."</pre><hr />";
        $sth = $dbh->prepare($sql);
        $sth->bindParam(':id', $_GET['itemID'], PDO::PARAM_INT);
        if ($sth->execute())
		{
			$GLOBALS['tpl_success'] = '������-����� ������� ������.';
            
            # ������� ���� �������-������
            if (!empty($itemInfo['file_name']))
            {
                $fullPathToFile = $_SERVER['DOCUMENT_ROOT'].'/app/site_sections_faq/'.basename($itemInfo['file_name']);
                if (is_file($fullPathToFile)) unlink($fullPathToFile);
            }
            
            # ������� backup'�
            $sql = '
            delete from '.DB_PREFIX.'backups
            where table_name = "faq"
                  and entry_id = :entry_id
            '; # echo '<pre>'.$sql."</pre><hr />";
            $sth = $dbh->prepare($sql);
            $sth->bindParam(':entry_id', $_GET['itemID'], PDO::PARAM_INT);
            $sth->execute();
            
			# ������� ������ ��������-�������
			return showItems();
		}
		else
		{
            if (empty($GLOBALS['tpl_failure'])) $GLOBALS['tpl_failure'] = '� ���������, ������-����� �� ������. ����������, ���������� � ������������� �����.';
			# ������� ������ ��������-�������
			return showItems();
		}
	}
} # /������� ������-�����

# ��������� ������-����� � ��
function addItemToDB()
{
	global $dbh;
	
	if (!empty($_POST['faq_form_name']))
	{ 
        $sql = '
        insert into '.DB_PREFIX.'faq
        (name, 
         url,
         title,
         full_navigation,
         navigation,
         h1,
         footeranchor,
         is_showable)
        values
        (:name,
         :url,
         :title,
         :full_navigation,
         :navigation,
         :h1,
         :footeranchor,
         :is_showable)
        '; # echo '<pre>'.$sql."</pre><hr />";
        $sth = $dbh->prepare($sql);
        $sth->bindParam(':name', $_POST['faq_form_name']);
        $sth->bindParam(':url', $_POST['faq_form_url']);
        $sth->bindParam(':title', $_POST['faq_form_title']);
        $sth->bindParam(':navigation', $_POST['faq_form_navigation']);
        # full_navigation
        if (empty($_POST['faq_form_full_navigation'])) $_POST['faq_form_full_navigation'] = null;
        $sth->bindParam(':full_navigation', $_POST['faq_form_full_navigation']);
        $sth->bindParam(':h1', $_POST['faq_form_h1']);
        # footeranchor
        if ($_POST['faq_form_footeranchor'] == '') $_POST['faq_form_footeranchor'] = null;
        $sth->bindParam(':footeranchor', $_POST['faq_form_footeranchor']);
        # is_showable
        $isShowable = !empty($_POST['faq_form_is_showable']) ? 1 : NULL;
        $sth->bindParam(':is_showable', $isShowable, PDO::PARAM_INT);
		try { if ($sth->execute()) {
            $last_insert_id = $dbh->lastInsertId(); # echo $last_insert_id.'<hr />';
			if (!empty($last_insert_id))
            {
                # ��������� ��� ����� �������-������
                $sql = '
                update '.DB_PREFIX.'faq
                set file_name = :file_name
                where id = :id
                '; # echo '<pre>'.$sql."</pre><hr />";
                $sth = $dbh->prepare($sql);
                # file_name
                $file_name = $last_insert_id.'.php';
                $sth->bindParam(':file_name', $file_name);
                $sth->bindParam(':id', $last_insert_id, PDO::PARAM_INT);
                $sth->execute();
                # /��������� ��� ����� �������-������
                
                return $last_insert_id;
            }
			else return;
        }}
        catch (PDOException $e) { if (DB_SHOW_ERRORS) { $GLOBALS['error'] = 'Error in SQL: '.$sql.' ('.$e->getMessage().')'; }}
	}
    else echo '� ����� addItemToDB �� �������� faq_form_name.';
} # /��������� ������-����� � ��

# �������� ������ �� �������
function getItemInfo()
{
	global $dbh;
	
	# �������� ����������
	if (empty($_GET['itemID'])) return;
	
	$sql = '
	select *
	from '.DB_PREFIX.'faq
	where id = :id
	'; # echo '<pre>'.$sql."</pre><hr />";
	$sth = $dbh->prepare($sql);
    $sth->bindParam(':id', $_GET['itemID'], PDO::PARAM_INT);
    $sth->execute();
    $itemInfo = $sth->fetch();
	if (!empty($itemInfo)) return $itemInfo;
	else return;
} # /�������� ������ �� �������

# ��������� ������� � ����
function saveContentToFile($itemID,
						   $text)
{
    /*
    echo 'itemID: '.$itemID.'<br />';
    echo 'text: '.$text.'<br />';
    */

	# �������� ����������
	if (empty($itemID)) return;
	if (empty($text)) return;
	
	$fullPathToFile = $_SERVER['DOCUMENT_ROOT'].'/app/site_sections_faq/'.basename($itemID.'.php'); # echo 'fullPathToNewFile: '.$fullPathToNewFile.'<br />';
    
    file_put_contents($fullPathToFile, $text, LOCK_EX);
    if (is_file($fullPathToFile)) chmod($fullPathToFile, 0755);
} # /��������� ������� � ����

# ������ SELECT � �������� ��� ������������ � �������
/* function buildAllFooteranchors($footerAnchorID = NULL)
{
    global $dbh;
    
    $sql = '
    select id,
           anchor
    from '.DB_PREFIX.'footeranchors
    order by anchor
    '; # echo '<pre>'.$sql."</pre><hr />";
    $sth = $dbh->prepare($sql);
    $sth->execute();
    $_ = $sth->fetchAll();
    $options = array();
    foreach ($_ as $item)
    {
        # selected
        if (!empty($footerAnchorID) && $footerAnchorID == $item['id']) $selected = ' selected="selected"';
        else unset($selected);
        
        $options[] = '<option value="'.$item['id'].'"'.$selected.'>'.$item['anchor'].'</option>';
    }
    if (!empty($options) and is_array($options)) $options = implode(PHP_EOL, $options);
    $result = '<select id="faq_form_footeranchor_id" name="faq_form_footeranchor_id" class="form-control">'.PHP_EOL.'<option value="null">�� ������</option>'.PHP_EOL.$options.'</select>';
    if (!empty($result)) return $result;
} */ # /������ SELECT � �������� ��� ������������ � �������

# /����������