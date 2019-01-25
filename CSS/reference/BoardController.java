package org.zerock.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.zerock.domain.BoardVO;
import org.zerock.domain.ChartVO;
import org.zerock.domain.ColsVO;
import org.zerock.domain.Criteria;
import org.zerock.domain.RowsVO;
import org.zerock.domain.RowsVO2;
import org.zerock.service.BoardService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/board/*")
@AllArgsConstructor
public class BoardController {
	private BoardService service;
	
//	@GetMapping("/list")
//	public void list(Model model) {
//		log.info("list");
//		model.addAttribute("list",service.getList());
//	}
	
	@GetMapping("/chart")
	public void chartPage() {
		
	}
	@GetMapping(value="/chartData")
	@ResponseBody
	public  Map<String,Object> getMap(){
	String v1 = "mushrooms";
	int v2 = 32;
	String v3 = "onions";
	int v4 = 53;
	String v5 = "pepper";
	int v6 = 15;
	String v7 = "lemon";
	int v8 = 25;
	String v9 = "apple";
	int v10 = 16;
	Map<String,Object> json = new HashMap<String,Object>();
	
	Map<String,List>rowsMap= new HashMap<>();
	Map<String,List>rowsMap2= new HashMap<>();
	Map<String,List>rowsMap3= new HashMap<>();
	Map<String,List>rowsMap4= new HashMap<>();
	Map<String,List>rowsMap5= new HashMap<>();
	ArrayList<ColsVO> colsList = new ArrayList<ColsVO>();
	ArrayList<Object> rowsList = new ArrayList<Object>();
	ArrayList<Object> rowsList2 = new ArrayList<Object>();
	ArrayList<Object> rowsList3 = new ArrayList<Object>();
	ArrayList<Object> rowsList4 = new ArrayList<Object>();
	ArrayList<Object> rowsList5 = new ArrayList<Object>();
	ArrayList<Map> rowSum = new ArrayList<Map>();
	
	
	
	colsList.add(new ColsVO("","Topping","","string"));
	colsList.add(new ColsVO("","Slices","","number"));
	


	rowsList.add(new RowsVO(v1,null));
	rowsList.add(new RowsVO2(v2,null));
	rowsMap.put("c",rowsList);
	rowSum.add(rowsMap);
	
	rowsList2.add(new RowsVO(v3,null));
	rowsList2.add(new RowsVO2(v4,null));
	rowsMap2.put("c",rowsList2);
	rowSum.add(rowsMap2);
	
	rowsList3.add(new RowsVO(v5,null));
	rowsList3.add(new RowsVO2(v6,null));
	rowsMap3.put("c",rowsList3);
	rowSum.add(rowsMap3);
	
	rowsList4.add(new RowsVO(v7,null));
	rowsList4.add(new RowsVO2(v8,null));
	rowsMap4.put("c",rowsList4);
	rowSum.add(rowsMap4);
	
	rowsList5.add(new RowsVO(v9,null));
	rowsList5.add(new RowsVO2(v10,null));
	rowsMap5.put("c",rowsList5);
	rowSum.add(rowsMap5);
	
	
	json.put("rows",rowSum);
	json.put("cols",colsList);
	

	return json;
	}
	@GetMapping("/chartData2")
	@ResponseBody
	public String chart(Model model) {
		log.info("chart"+ model);
		BoardVO board = service.get(41L);
		Map<String,String> map = new HashMap<String,String>();
		map.put("test1","answer1111");
		map.put("test2","answer11");
		map.put("test3","answer19");
		map.put("test13","answer18");
		map.put("test14","answer17");
		map.put("test15","answer16");
		map.put("test16","answer15");
		map.put("test17","answer14");
		map.put("test18","answer13");
		map.put("test19","answer12");
		String result="";
		if(result!="")result+=",";
		Set<String> keys = map.keySet();
		String json="";
		Map<String,Map> list = new HashMap<String,Map>();
		
		try {
			 json = new ObjectMapper().writeValueAsString(map);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		for(String key:keys) {
			
			result+= "{\""+key+"\": \""+map.get(key)+"\"}";
		}
		System.out.println(result);
		
		result+="{\n" + 
				"	\"cols\": ["+json+"]," + "],\n" + 
						"	\"rows\": ["+json+"]\n" + 
								"}";
		
		
		return json;
		
	}
	
	@GetMapping("/list")
	public void list(Criteria cri, Model model) {
		log.info("list  @@"+cri);
		model.addAttribute("list",service.getList(cri));
	}
	
	
	
	
	
	
	@PostMapping("/register")
	public String register(BoardVO board, RedirectAttributes rttr) {
		log.info("register : "+board);
		service.register(board);
		rttr.addFlashAttribute("result",board.getBno());
		return "redirect:/board/list";
	}
	@GetMapping("/register")
	public void register() {
		
	}
	
	@PostMapping("/modify")
	public String modify(BoardVO board, RedirectAttributes rttr) {
		log.info("modify: "+board);
		if(service.modify(board)) {
			rttr.addFlashAttribute("result","success");
		}
		return "redirect:/board/list";
		
		
	}
	@GetMapping({"/get","/modify"})
	public void get(@RequestParam("bno") Long bno, Model model) {
		log.info("/get modify"+bno);
		model.addAttribute("board",service.get(bno));
	}
	@PostMapping("/remove")
	public String remove(@RequestParam("bno") Long bno,RedirectAttributes rttr) {
		log.info("remove......."+bno);
		if(service.remove(bno)) {
			rttr.addFlashAttribute("result","success");
		}
		return "redirect:/board/list";
	}
	
	
}
